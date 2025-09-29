import { type ChangeEvent, useCallback, useMemo, useState } from 'react';

/*

    interface Ingredients {
        mayo: boolean
        mustard: boolean
        ketchup: boolean
    }

    const [{ output, all, mixed }, { onFollowerChange, onLeadChange }] =
    useLeader<Ingredients>({
        mayo: false,
        mustard: true,
        ketchup: false,
    })

*/

export default function useLeader<T extends Record<keyof T, boolean>>(
    items: T,
): [
    {
        output: T;
        all: boolean;
        mixed: boolean;
    },
    {
        onFollowerChange: (event: ChangeEvent<HTMLInputElement>) => void;
        onLeadChange: () => void;
        isSelected: (slice: string) => boolean;
    },
] {
    const [mixedState, dispatchUpdate] = useState<T>(items);

    const allChecked = useMemo(() => {
        return Object.keys(mixedState).every(
            (slice: string) => mixedState[slice as keyof T],
        );
    }, [mixedState]);

    const someChecked = useMemo(() => {
        return allChecked
            ? false
            : Object.keys(mixedState).some(
                  (slice: string) => mixedState[slice as keyof T],
              );
    }, [mixedState, allChecked]);

    const isMixed = useMemo(() => {
        return !!(someChecked && !allChecked);
    }, [someChecked, allChecked]);

    const output = useMemo(() => mixedState, [mixedState]);

    const onLeadChange = useCallback(() => {
        dispatchUpdate(
            Object.keys(mixedState).reduce(
                (state, slice) => ({
                    ...state,
                    [slice]: !allChecked,
                }),
                {},
            ) as T,
        );
    }, [allChecked, mixedState]);

    const onFollowerChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            const { name } = event.target;
            dispatchUpdate((prevState) => ({
                ...prevState,
                [name]: !prevState[name as keyof T],
            }));
        },
        [],
    );

    const isSelected = useCallback(
        (slice: string) => {
            return mixedState[slice as keyof T];
        },
        [mixedState],
    );

    return [
        {
            output,
            all: allChecked,
            mixed: isMixed,
        },
        { onFollowerChange, onLeadChange, isSelected },
    ];
}
