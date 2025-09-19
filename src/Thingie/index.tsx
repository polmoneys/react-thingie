import {
    createContext,
    type ReactNode,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

import type { Key, SelectionAPI } from './interfaces';
import { getKeyFrom } from './utils';

export default function createThingie<T>(displayName?: string) {
    const Ctx = createContext<SelectionAPI<T> | undefined>(undefined);
    Ctx.displayName = displayName ?? 'ThingWithSelection';

    type Props = {
        items: Array<T>;
        keySelector: (item: T) => Key;
        initialSelectedKeys?: Array<Key>;
        children?: ReactNode;
    };

    function Thingie({
        items,
        keySelector,
        initialSelectedKeys = [],
        children,
    }: Props) {
        const [selectedKeys, setSelectedKeys] = useState<Set<Key>>(
            () => new Set(initialSelectedKeys),
        );

        const isSelected = useCallback(
            (itemOrKey: T | Key) =>
                selectedKeys.has(getKeyFrom(itemOrKey, keySelector)),
            [selectedKeys, keySelector],
        );

        const toggle = useCallback(
            (itemOrKey: T | Key) => {
                const k = getKeyFrom(itemOrKey, keySelector);
                setSelectedKeys((prev) => {
                    const next = new Set(prev);
                    if (next.has(k)) next.delete(k);
                    else next.add(k);
                    return next;
                });
            },
            [keySelector],
        );

        const add = useCallback(
            (itemOrKey: T | Key) => {
                const k = getKeyFrom(itemOrKey, keySelector);
                setSelectedKeys((prev) => {
                    if (prev.has(k)) return prev;
                    const next = new Set(prev);
                    next.add(k);
                    return next;
                });
            },
            [keySelector],
        );

        const remove = useCallback(
            (itemOrKey: T | Key) => {
                const k = getKeyFrom(itemOrKey, keySelector);
                setSelectedKeys((prev) => {
                    if (!prev.has(k)) return prev;
                    const next = new Set(prev);
                    next.delete(k);
                    return next;
                });
            },
            [keySelector],
        );

        const clear = useCallback(() => setSelectedKeys(new Set()), []);

        const exportSelected = useCallback(
            () => items.filter((i) => selectedKeys.has(keySelector(i))),
            [items, keySelector, selectedKeys],
        );

        const api = useMemo<SelectionAPI<T>>(
            () => ({
                items,
                keyOf: keySelector,
                selectedKeys,
                selectedCount: selectedKeys.size,
                isSelected,
                toggle,
                add,
                remove,
                clear,
                exportSelected,
            }),
            [
                items,
                keySelector,
                selectedKeys,
                isSelected,
                toggle,
                add,
                remove,
                clear,
                exportSelected,
            ],
        );

        return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
    }

    function useSelection() {
        const ctx = useContext(Ctx);
        if (!ctx)
            throw new Error(
                `${Ctx.displayName} hook must be used inside its <Thingie> provider`,
            );
        return ctx;
    }

    return { Thingie, useSelection } as const;
}
