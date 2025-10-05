import { useEffect, useMemo, useState } from 'react';

import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';
import { useWorker } from '../utilities/web-worker';
import { formatSelectedKeys } from '../utils';

export const ITEMS = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 22, active: true },
    { id: 4, name: 'Diana', age: 35, active: true },
    { id: 5, name: 'Eve', age: 28, active: false },
    { id: 6, name: 'Frank', age: 40, active: true },
    { id: 7, name: 'Grace', age: 19, active: true },
    { id: 8, name: 'Hank', age: 50, active: false },
    { id: 9, name: 'Ivy', age: 29, active: true },
    { id: 10, name: 'Jack', age: 33, active: false },
];

export default function DemoWebWorker({
    items = ITEMS,
}: {
    items?: Record<string, any>[];
}) {
    const [count, setCount] = useState<number | null>(null);
    const [sample, setSample] = useState<any[]>([]);
    const worker = useMemo(
        () =>
            new Worker(
                new URL(
                    '../utilities/web-worker-compute-array.ts',
                    import.meta.url,
                ),
                {
                    type: 'module',
                },
            ),
        [],
    );
    const workerApi = useWorker(worker);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            try {
                await workerApi.call(
                    'setData',
                    { data: items },
                    undefined,
                    5000,
                );
                const res = await workerApi.call(
                    'filterMap',
                    {
                        predicate: { type: 'keyEq', key: 'active', val: true },
                        map: { type: 'pickKey', key: 'name' },
                    },
                    undefined,
                    5000,
                );
                // don't set state if unmounted
                if (cancelled) return;
                setSample((res as any).result.slice(0, 10));
                const len = await workerApi.call(
                    'getLength',
                    undefined,
                    undefined,
                    2000,
                );
                if (cancelled) return;
                setCount((len as any).length);
            } catch (err: any) {
                // Ignore worker termination/lifecycle rejections — treat others as real errors
                if (err?.code === 'WORKER_TERMINATED') return;
                console.error('Worker error', err);
            }
        })();

        return () => {
            cancelled = true;
            // no explicit workerApi.terminate() necessary when useWorkerRpc was created with autoTerminate:true
        };
    }, [workerApi, items]);

    return (
        <Alert mood="positive">
            <Font.Bold>Worker data length: {count ?? '...'}</Font.Bold>
            <Font>Sample names: {formatSelectedKeys(new Set(sample))}</Font>
        </Alert>
    );
}
