import { useCallback, useMemo } from 'react';

import { useIsFetching, useQueryClient } from '@tanstack/react-query';

import type {
    UseTanstackQueryOptions,
    UseTanstackQueryReturn,
} from './interfaces';

export default function useTanstackQuery({
    queryKey,
    exactMatch = false,
}: UseTanstackQueryOptions): UseTanstackQueryReturn {
    const queryClient = useQueryClient();

    const fetchingCount = useIsFetching({
        queryKey,
        exact: exactMatch,
    });

    const isFetching = fetchingCount > 0;

    const invalidate = useCallback(
        async (
            options: {
                refetchActive?: boolean;
                refetchInactive?: boolean;
            } = {},
        ) => {
            await queryClient.invalidateQueries({
                queryKey,
                exact: exactMatch,
                refetchType:
                    options.refetchActive === false &&
                    options.refetchInactive === false
                        ? 'none'
                        : options.refetchInactive
                          ? 'all'
                          : 'active',
            });
        },
        [queryClient, queryKey, exactMatch],
    );

    const invalidateAll = useCallback(async () => {
        await queryClient.invalidateQueries();
    }, [queryClient]);

    const setData = useCallback(
        <TData = unknown>(
            updater: TData | ((old: TData | undefined) => TData),
        ) => {
            queryClient.setQueryData<TData>(queryKey, updater);
        },
        [queryClient, queryKey],
    );

    const appendData = useCallback(
        <TData = unknown>(
            newItem: TData extends Array<infer U> ? U : never,
        ) => {
            queryClient.setQueryData<TData>(queryKey, (old) => {
                if (Array.isArray(old)) {
                    return [...old, newItem] as TData;
                }
                return old;
            });
        },
        [queryClient, queryKey],
    );

    const prependData = useCallback(
        <TData = unknown>(
            newItem: TData extends Array<infer U> ? U : never,
        ) => {
            queryClient.setQueryData<TData>(queryKey, (old) => {
                if (Array.isArray(old)) {
                    return [newItem, ...old] as TData;
                }
                return old;
            });
        },
        [queryClient, queryKey],
    );

    const removeDataItem = useCallback(
        <TData = unknown>(
            predicate: TData extends Array<infer U>
                ? (item: U, index: number) => boolean
                : never,
        ) => {
            queryClient.setQueryData<TData>(queryKey, (old) => {
                if (Array.isArray(old)) {
                    return old.filter(
                        (item, idx) => !predicate(item, idx),
                    ) as TData;
                }
                return old;
            });
        },
        [queryClient, queryKey],
    );

    const updateDataItem = useCallback(
        <TData = unknown>(
            predicate: TData extends Array<infer U>
                ? (item: U, index: number) => boolean
                : never,
            updater: TData extends Array<infer U> ? (item: U) => U : never,
        ) => {
            queryClient.setQueryData<TData>(queryKey, (old) => {
                if (Array.isArray(old)) {
                    return old.map((item, idx) =>
                        predicate(item, idx) ? updater(item) : item,
                    ) as TData;
                }
                return old;
            });
        },
        [queryClient, queryKey],
    );

    const getData = useCallback(<TData = unknown>() => {
        return queryClient.getQueryData<TData>(queryKey);
    }, [queryClient, queryKey]);

    const removeQueries = useCallback(() => {
        queryClient.removeQueries({ queryKey, exact: exactMatch });
    }, [queryClient, queryKey, exactMatch]);

    const cancelQueries = useCallback(async () => {
        await queryClient.cancelQueries({ queryKey, exact: exactMatch });
    }, [queryClient, queryKey, exactMatch]);

    const refetch = useCallback(
        async (options: { force?: boolean } = {}) => {
            await queryClient.refetchQueries({
                queryKey,
                exact: exactMatch,
                type: options.force ? 'all' : 'active',
            });
        },
        [queryClient, queryKey, exactMatch],
    );

    const getQueryState = useCallback(<TData = unknown, TError = Error>() => {
        return queryClient.getQueryState<TData, TError>(queryKey);
    }, [queryClient, queryKey]);

    return useMemo(
        () => ({
            isFetching,
            invalidate,
            invalidateAll,
            setData,
            appendData,
            prependData,
            removeDataItem,
            updateDataItem,
            getData,
            removeQueries,
            cancelQueries,
            refetch,
            getQueryState,
        }),
        [
            isFetching,
            invalidate,
            invalidateAll,
            setData,
            appendData,
            prependData,
            removeDataItem,
            updateDataItem,
            getData,
            removeQueries,
            cancelQueries,
            refetch,
            getQueryState,
        ],
    );
}
