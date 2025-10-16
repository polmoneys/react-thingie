import { useCallback, useEffect, useRef, useState } from 'react';

import { produce } from 'immer';

import type { Opts } from './interfaces';

export default function useItemEditor<T extends object, D extends object = T>(
    initial: T,
    opts?: Opts<T, D>,
) {
    const {
        mapper,
        historyLimit = 50,
        enableHistory = true,
        valueDedup = true,
    } = opts || {};

    const toDraftRef = useRef(mapper?.toDraft);
    const fromDraftRef = useRef(mapper?.fromDraft);
    toDraftRef.current = mapper?.toDraft;
    fromDraftRef.current = mapper?.fromDraft;

    const initialDraft = toDraftRef.current
        ? toDraftRef.current(initial)
        : (initial as unknown as D);

    const [original, setOriginal] = useState<T>(initial);
    const [draft, setDraft] = useState<D>(initialDraft);

    const historyRef = useRef<D[]>(enableHistory ? [initialDraft] : []);
    const pointerRef = useRef<number>(enableHistory ? 0 : -1);

    useEffect(() => {
        setOriginal(initial);
        const mapped = toDraftRef.current
            ? toDraftRef.current(initial)
            : (initial as unknown as D);
        setDraft(mapped);
        if (enableHistory) {
            historyRef.current = [mapped];
            pointerRef.current = 0;
        }
    }, [initial, enableHistory]);

    // deepEqual helper (used only if valueDedup=true)
    const deepEqual = useCallback((a: any, b: any): boolean => {
        if (a === b) return true;
        if (a instanceof Date && b instanceof Date)
            return a.getTime() === b.getTime();
        if (a instanceof Date || b instanceof Date) return false;
        if (
            typeof a !== 'object' ||
            typeof b !== 'object' ||
            a == null ||
            b == null
        )
            return a === b;
        if (Array.isArray(a) || Array.isArray(b)) {
            if (!Array.isArray(a) || !Array.isArray(b)) return false;
            if (a.length !== b.length) return false;
            for (let i = 0; i < a.length; i++)
                if (!deepEqual(a[i], b[i])) return false;
            return true;
        }
        const ka = Object.keys(a);
        const kb = Object.keys(b);
        if (ka.length !== kb.length) return false;
        for (const k of ka) {
            if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
            if (!deepEqual(a[k], b[k])) return false;
        }
        return true;
    }, []);

    const pushHistory = useCallback(
        (nextDraft: D) => {
            if (!enableHistory) return;
            const h = historyRef.current;
            const p = pointerRef.current;
            if (p < h.length - 1) h.splice(p + 1);
            const last = h.length ? h[h.length - 1] : undefined;
            if (last === nextDraft) {
                pointerRef.current = h.length - 1;
                return;
            }
            if (
                valueDedup &&
                last !== undefined &&
                deepEqual(last, nextDraft as any)
            ) {
                pointerRef.current = h.length - 1;
                return;
            }
            h.push(nextDraft);
            if (h.length > historyLimit) {
                h.shift();
                pointerRef.current = h.length - 1;
            } else {
                pointerRef.current = h.length - 1;
            }
        },
        [enableHistory, historyLimit, valueDedup, deepEqual],
    );

    const set = useCallback(
        (partial: Partial<D>) => {
            setDraft((prev) => {
                const next = produce(prev, (draftState: D) => {
                    Object.assign(draftState, partial);
                });
                if (next === prev) return prev;
                pushHistory(next);
                return next;
            });
        },
        [pushHistory],
    );

    const setAt = useCallback(
        (path: string, value: any) => {
            setDraft((prev) => {
                const next = produce(prev, (draftState: any) => {
                    const segs = path.split('.').filter(Boolean);
                    let cur = draftState;
                    for (let i = 0; i < segs.length - 1; i++) {
                        if (!cur[segs[i]] || typeof cur[segs[i]] !== 'object')
                            cur[segs[i]] = {};
                        cur = cur[segs[i]];
                    }
                    cur[segs[segs.length - 1]] = value;
                });
                if (next === prev) return prev;
                pushHistory(next);
                return next;
            });
        },
        [pushHistory],
    );

    const getAt = useCallback(
        (path: string) => {
            const segs = path.split('.').filter(Boolean);
            let cur: any = draft;
            for (const s of segs) {
                if (cur == null) return undefined;
                cur = cur[s];
            }
            return cur;
        },
        [draft],
    );

    const rollback = useCallback(() => {
        const newDraft = toDraftRef.current
            ? toDraftRef.current(original)
            : (original as unknown as D);
        setDraft(newDraft);
        if (enableHistory) {
            historyRef.current = [newDraft];
            pointerRef.current = 0;
        }
    }, [original, enableHistory]);

    const undo = useCallback(() => {
        if (!enableHistory) return;
        if (pointerRef.current > 0) {
            pointerRef.current -= 1;
            setDraft(historyRef.current[pointerRef.current]);
        }
    }, [enableHistory]);

    const canUndo = enableHistory && pointerRef.current > 0;

    const onServerResponse200 = useCallback(
        (newOriginal: T) => {
            setOriginal(newOriginal);
            const newDraft = toDraftRef.current
                ? toDraftRef.current(newOriginal)
                : (newOriginal as unknown as D);
            setDraft(newDraft);
            if (enableHistory) {
                historyRef.current = [newDraft];
                pointerRef.current = 0;
            }
        },
        [enableHistory],
    );

    const commit = useCallback(() => {
        return fromDraftRef.current
            ? fromDraftRef.current(draft)
            : (draft as unknown as T);
    }, [draft]);

    const _historyForDebug = useCallback(() => {
        try {
            return JSON.parse(JSON.stringify(historyRef.current));
        } catch {
            return historyRef.current.map((s) => ({
                ...(s as unknown as any),
            }));
        }
    }, []);

    return {
        original,
        draft,
        set,
        setAt,
        getAt,
        rollback,
        undo,
        canUndo,
        onServerResponse200,
        commit,
        _historyForDebug,
    };
}
