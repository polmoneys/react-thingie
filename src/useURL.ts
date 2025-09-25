import { useCallback } from 'react';

import {
    parseAsArrayOf,
    parseAsString,
    parseAsStringLiteral,
    useQueryState,
} from 'nuqs';

const UI_DIALOGS = ['dialog', 'tray', 'sheet'] as const;

export default function useURLDialogs() {
    const [dialogs, setDialogs] = useQueryState(
        'dialogs',
        parseAsStringLiteral(UI_DIALOGS),
    );

    const onOpenDialog = () => setDialogs(UI_DIALOGS[0]);
    const onOpenTray = () => setDialogs(UI_DIALOGS[1]);
    const onOpenSheet = () => setDialogs(UI_DIALOGS[2]);
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
        selection,
        toggleSelection,
        addToSelection,
        removeFromSelection,
        clearSelection,
    };
}
