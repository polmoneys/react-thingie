import { useCallback, useEffect, useRef } from 'react';

export type WorkerProps = {
    call<T = any, R = any>(
        action: string,
        payload?: T,
        transfer?: Transferable[],
        timeoutMs?: number,
    ): Promise<R>;
    terminate(): void;
};

const WORKER_TERMINATED_CODE = 'WORKER_TERMINATED';

function makeTerminationError(message = 'Worker terminated') {
    const e: any = new Error(message);
    e.code = WORKER_TERMINATED_CODE;
    return e as Error & { code: string };
}

export function useWorker(
    worker: Worker | null,
    opts?: { autoTerminate?: boolean },
): WorkerProps {
    const autoTerminate = opts?.autoTerminate ?? false;
    const reqId = useRef(0);
    const pending = useRef(
        new Map<
            number,
            {
                resolve: (v: any) => void;
                reject: (err: any) => void;
                timer?: number;
            }
        >(),
    );
    const workerRef = useRef<Worker | null>(worker);

    useEffect(() => {
        workerRef.current = worker;
        if (!worker) return;

        const onMessage = (ev: MessageEvent) => {
            const d = ev.data ?? {};
            const { __rpcId, ok, result, error } = d as any;
            if (typeof __rpcId !== 'number') return;
            const p = pending.current.get(__rpcId);
            if (!p) return;
            pending.current.delete(__rpcId);
            if (p.timer) clearTimeout(p.timer);
            if (ok) p.resolve(result);
            else p.reject(new Error(String(error)));
        };

        const onError = (ev: ErrorEvent) => {
            pending.current.forEach(({ reject, timer }) => {
                if (timer) clearTimeout(timer);
                const err: any = new Error(`Worker error: ${ev.message}`);
                err.code = WORKER_TERMINATED_CODE;
                reject(err);
            });
            pending.current.clear();
        };

        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);

        return () => {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);

            // When we remove listeners, explicitly reject pending requests with a machine-checkable code.
            pending.current.forEach(({ reject, timer }) => {
                if (timer) clearTimeout(timer);
                reject(makeTerminationError('Listener removed'));
            });
            pending.current.clear();

            if (autoTerminate) {
                // Also terminate the worker if hook owns it
                worker.terminate();
            }
        };
    }, [worker, autoTerminate]);

    const call = useCallback(
        <T = any, R = any>(
            action: string,
            payload?: T,
            transfer?: Transferable[],
            timeoutMs?: number,
        ) => {
            const w = workerRef.current;
            if (!w) return Promise.reject(new Error('No worker provided'));
            const id = ++reqId.current;
            return new Promise<R>((resolve, reject) => {
                const entry: any = { resolve, reject };
                if (typeof timeoutMs === 'number' && timeoutMs > 0) {
                    const timer = window.setTimeout(() => {
                        pending.current.delete(id);
                        reject(new Error('RPC timeout'));
                    }, timeoutMs);
                    entry.timer = timer;
                }
                pending.current.set(id, entry);
                try {
                    w.postMessage(
                        { __rpcId: id, action, payload },
                        transfer ?? [],
                    );
                } catch (err) {
                    pending.current.delete(id);
                    if (entry.timer) clearTimeout(entry.timer);
                    reject(err);
                }
            });
        },
        [],
    );

    function terminate() {
        const w = workerRef.current;
        pending.current.forEach(({ reject, timer }) => {
            if (timer) clearTimeout(timer);
            reject(makeTerminationError());
        });
        pending.current.clear();
        if (w) w.terminate();
        workerRef.current = null;
    }

    return { call, terminate };
}
