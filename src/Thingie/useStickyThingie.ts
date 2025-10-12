import { useCallback, useRef } from 'react';

import {
    useMutation,
    type UseMutationOptions,
    useQuery,
    useQueryClient,
    type UseQueryOptions,
} from '@tanstack/react-query';

import type { CreateHooksOptions } from './interfaces';
import { makeQueryOptions } from './utils';

export default function createLocalStorageHooks<T = any>(
    key: string,
    opts: CreateHooksOptions<T> = {},
) {
    const {
        serialize = JSON.stringify,
        deserialize = JSON.parse,
        defaultValue = null,
        defaultMutationOptions,
        defaultQueryOptions,
    } = opts;

    function useGet(
        queryOptions?: UseQueryOptions<
            T | null,
            unknown,
            T | null,
            readonly [string]
        >,
    ) {
        const optsRef = useRef({ serialize, deserialize });
        optsRef.current = { serialize, deserialize };

        const read = useCallback((): T | null => {
            if (typeof window === 'undefined') return defaultValue;
            const raw = localStorage.getItem(key);
            if (raw == null) return defaultValue;
            try {
                return optsRef.current.deserialize(raw);
            } catch {
                return defaultValue;
            }
        }, []);

        const merged = makeQueryOptions<
            T | null,
            unknown,
            T | null,
            readonly [string]
        >({
            queryKey: [key] as const,
            queryFn: async () => read(),
            initialData: () => read(),
            ...(defaultQueryOptions ?? {}),
            ...(queryOptions ?? {}),
        });

        return useQuery(merged);
    }

    function useSet(
        mutationOptions?: UseMutationOptions<void, unknown, T, unknown>,
    ) {
        const optsRef = useRef({ serialize, deserialize });
        optsRef.current = { serialize, deserialize };

        const queryClient = useQueryClient();

        return useMutation<void, unknown, T>({
            mutationFn: async (newValue: T) => {
                if (typeof window === 'undefined') return;
                const raw = optsRef.current.serialize(newValue);
                localStorage.setItem(key, raw);
            },
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: [key] as const });
            },
            ...(defaultMutationOptions ?? {}),
            ...(mutationOptions ?? {}),
        });
    }

    return { useGet, useSet };
}
