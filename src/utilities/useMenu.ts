import { useEffect, useRef, useState } from 'react';

export type Menu<T extends string> = T | null;
export type MenuAction<T extends string> =
    | Menu<T>
    | ((prev: Menu<T>) => Menu<T>);

export interface UseMenuOptions<T extends string> {
    onOpen?: (key: T) => void;
    onClose?: (key: T) => void;
    // onClose(from) -> onSwitch(from, to) -> onOpen(to)
    onSwitch?: (from: T, to: T) => void;
}
const useMenu = <T extends string>(
    initialState: Menu<T> = null,
    options?: UseMenuOptions<T>,
): [Menu<T>, (action: Menu<T>) => void] => {
    const [state, setState] = useState<Menu<T>>(initialState);

    const optionsRef = useRef<UseMenuOptions<T> | undefined>(options);
    optionsRef.current = options;

    const prevRef = useRef<Menu<T> | undefined>(undefined);

    useEffect(() => {
        const prev = prevRef.current;
        const next = state;
        const opts = optionsRef.current;

        if (prev === undefined) {
            prevRef.current = next;
            return;
        }

        if (prev === next) {
            prevRef.current = next;
            return;
        }

        if (prev === null && next !== null) {
            opts?.onOpen?.(next);
            prevRef.current = next;
            return;
        }

        if (prev !== null && next === null) {
            opts?.onClose?.(prev);
            prevRef.current = next;
            return;
        }

        // keyA -> keyB (both non-null & different)
        if (prev !== null && next !== null && prev !== next) {
            opts?.onClose?.(prev);
            opts?.onSwitch?.(prev, next);
            opts?.onOpen?.(next);
            prevRef.current = next;
            return;
        }

        prevRef.current = next;
    }, [state]);

    const dispatch = (action: Menu<T>) =>
        setState((prev) => (prev === action ? null : action));

    return [state, dispatch];
};

export default useMenu;
