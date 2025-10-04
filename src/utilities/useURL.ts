import { useCallback } from 'react';

import {
    parseAsArrayOf,
    parseAsString,
    parseAsStringLiteral,
    useQueryState,
} from 'nuqs';

const UI_GENERIC = ['dialog', 'tray', 'sheet'] as const;
const UI_CRITICAL = ['cart'] as const;

const UI = [...UI_GENERIC, ...UI_CRITICAL] as const;

export default function useURL() {
    const [dialogs, setDialogs] = useQueryState(
        'dialogs',
        parseAsStringLiteral(UI),
    );

    const onOpenDialog = () => setDialogs(UI[0]);
    const onOpenTray = () => setDialogs(UI[1]);
    const onOpenSheet = () => setDialogs(UI[2]);
    const onOpenCart = () => setDialogs(UI_CRITICAL[0]);

    const onClose = () => setDialogs(null);

    const [selection, setSelection] = useQueryState(
        'selection',
        parseAsArrayOf(parseAsString),
    );

    const addToSelection = useCallback(
        (value: string) =>
            setSelection((prev) => {
                const arr = prev ?? [];
                if (arr.includes(value)) return arr;
                return [...arr, value];
            }),
        [setSelection],
    );

    const removeFromSelection = useCallback(
        (value: string) =>
            setSelection((prev) => (prev ?? []).filter((v) => v !== value)),
        [setSelection],
    );

    const toggleSelection = useCallback(
        (value: string) =>
            setSelection((prev) => {
                const arr = prev ?? [];
                return arr.includes(value)
                    ? arr.filter((v) => v !== value)
                    : [...arr, value];
            }),
        [setSelection],
    );

    const clearSelection = useCallback(
        () => setSelection(null),
        [setSelection],
    );
    return {
        onClose,
        dialogs,
        onOpenSheet,
        onOpenTray,
        onOpenDialog,
        onOpenCart,
        selection,
        toggleSelection,
        addToSelection,
        removeFromSelection,
        clearSelection,
    };
}
