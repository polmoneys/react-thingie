import {
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react';

import type {
    Collections,
    GroupKey,
    Id,
    Ids,
    IndexedItem,
    ItemBase,
} from './interfaces';
import { reducer } from './utils';

export default function useBasket<T extends ItemBase>(
    initialCollections?: Collections<T>,
) {
    // index: id -> IndexedItem
    const indexRef = useRef<Map<Id, IndexedItem<T>>>(new Map());
    // groups: group -> ids
    const groupsRef = useRef<Map<GroupKey, Ids>>(new Map());
    const [optionsVersion, bumpOptionsVersion] = useState(0);

    // run once on "mount"
    useMemo(() => {
        if (!initialCollections) return;
        for (const [group, items] of Object.entries(initialCollections)) {
            addOptionsInternal(group, items as Array<T>);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [state, dispatch] = useReducer(reducer, { selected: [] });

    const selectedSetRef = useRef<Set<Id>>(new Set());

    useEffect(() => {
        selectedSetRef.current = new Set(state.selected);
    }, [state.selected]);

    function addOptionsInternal(group: GroupKey, items: Array<T>) {
        const groups = groupsRef.current;
        const index = indexRef.current;

        const ids = groups.get(group) ?? [];
        for (const it of items) {
            index.set(it.id, { group, item: it });
            // if id not present in group list, push it to preserve bucket order
            if (!ids.includes(it.id)) ids.push(it.id);
        }
        groups.set(group, ids);
        bumpOptionsVersion((v) => v + 1);
    }

    const addOptions = useCallback((group: GroupKey, items: Array<T>) => {
        addOptionsInternal(group, items);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getItem = useCallback((id: Id) => indexRef.current.get(id)?.item, []);

    const availableGroups = useCallback(
        () => Array.from(groupsRef.current.keys()),
        [],
    );

    const availableItemsInGroup = useCallback((group: GroupKey) => {
        const ids = groupsRef.current.get(group) ?? [];
        return ids.map((id) => indexRef.current.get(id)!.item);
    }, []);

    const add = useCallback((ids: Ids) => dispatch({ type: 'ADD', ids }), []);
    const remove = useCallback(
        (ids: Ids) => dispatch({ type: 'REMOVE', ids }),
        [],
    );
    const toggle = useCallback(
        (id: Id) => dispatch({ type: 'TOGGLE', id }),
        [],
    );
    const set = useCallback((ids: Ids) => dispatch({ type: 'SET', ids }), []);
    const clear = useCallback(() => dispatch({ type: 'CLEAR' }), []);

    const flattened = useMemo(() => {
        return state.selected
            .map((id) => indexRef.current.get(id)?.item)
            .filter(Boolean) as Array<T>;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.selected, optionsVersion]);

    const grouped = useMemo(() => {
        const out = new Map<GroupKey, Array<T>>();
        for (const id of state.selected) {
            const rec = indexRef.current.get(id);
            if (!rec) continue;
            const arr = out.get(rec.group) ?? [];
            arr.push(rec.item);
            out.set(rec.group, arr);
        }
        return out;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.selected, optionsVersion]);

    const countsByGroup = useMemo(() => {
        const counts: Record<string, number> = {};
        for (const [g, _ids] of groupsRef.current.entries()) counts[g] = 0;
        for (const id of state.selected) {
            const rec = indexRef.current.get(id);
            if (!rec) continue;
            counts[rec.group] = (counts[rec.group] || 0) + 1;
        }
        return counts;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.selected, optionsVersion]);

    const exportSelection = useCallback(
        <R = { id: Id; group: GroupKey }>(
            mapper?: (rec: IndexedItem<T>) => R,
        ) => {
            return state.selected
                .map((id) => indexRef.current.get(id))
                .filter(Boolean)
                .map((rec) =>
                    mapper
                        ? mapper(rec as IndexedItem<T>)
                        : ({
                              id: (rec as IndexedItem<T>).item.id,
                              group: (rec as IndexedItem<T>).group,
                          } as any),
                );
        },
        [state.selected],
    );

    // (O(1))
    const isSelected = useCallback(
        (id: Id) => selectedSetRef.current.has(id),
        [],
    );

    return {
        api: { add, remove, toggle, set, clear, addOptions },
        views: {
            flattened,
            grouped,
            countsByGroup,
            selectedIds: state.selected,
        },
        helpers: {
            getItem,
            availableGroups,
            availableItemsInGroup,
            isSelected,
            export: exportSelection,
        },
    };
}
