import { useCallback, useEffect, useRef, useState } from 'react';

import { deepEqual } from 'assert';
import { produce } from 'immer';

import type { Opts } from './interfaces';

export default function useItem<T extends object, D extends object = T>(
    initial: T,
    opts?: Opts<T, D>,
) {
    const { mapper, historyLimit = 50, enableHistory = true } = opts || {};

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

    // When the `initial` prop changes from parent, sync original + draft and reset history.
    // This avoids computing mapper on every render and avoids accidental state churn.
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

    const pushHistory = useCallback(
        (nextDraft: D) => {
            if (!enableHistory) return;

            const h = historyRef.current;
            const p = pointerRef.current;

            // drop future if we undid
            if (p < h.length - 1) h.splice(p + 1);

            const last = h.length ? h[h.length - 1] : undefined;

            // value-based dedupe: avoids duplicates even if references differ
            if (last !== undefined && deepEqual(last, nextDraft)) {
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
        [enableHistory, historyLimit],
    );

    const set = useCallback(
        (partial: Partial<D>) => {
            setDraft((prev) => {
                // produce new state — mutate draftState in-place inside recipe
                const next = produce(prev, (draftState: D) => {
                    Object.assign(draftState, partial);
                });
                // avoid updating state if nothing changed (produce may return prev)
                if (next === prev) return prev;

                pushHistory(next);
                return next;
            });
        },
        [pushHistory],
    );

    const setAt = useCallback(
        (path: string, value: unknown) => {
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
            const snap = historyRef.current[pointerRef.current];
            // setDraft to a snapshot reference (no produce needed)
            setDraft(snap);
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

    // const _history = () => clone(historyRef.current);
    // const _pointer = () => pointerRef.current;

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
        // _history,
        // _pointer,
    };
}
