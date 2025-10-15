type QueryKey = readonly unknown[];

export interface UseTanstackQueryOptions {
    queryKey: QueryKey;
    /**
     * If true, operations will affect only exact matches
     * If false, will affect all queries with this key as prefix
     */
    exactMatch?: boolean;
}

export interface UseTanstackQueryReturn {
    isFetching: boolean;

    invalidate: (options?: {
        refetchActive?: boolean;
        refetchInactive?: boolean;
    }) => Promise<void>;
    invalidateAll: () => Promise<void>;

    setData: <TData = unknown>(
        updater: TData | ((old: TData | undefined) => TData),
    ) => void;
    appendData: <TData = unknown>(
        newItem: TData extends Array<infer U> ? U : never,
    ) => void;
    prependData: <TData = unknown>(
        newItem: TData extends Array<infer U> ? U : never,
    ) => void;
    removeDataItem: <TData = unknown>(
        predicate: TData extends Array<infer U>
            ? (item: U, index: number) => boolean
            : never,
    ) => void;
    updateDataItem: <TData = unknown>(
        predicate: TData extends Array<infer U>
            ? (item: U, index: number) => boolean
            : never,
        updater: TData extends Array<infer U> ? (item: U) => U : never,
    ) => void;

    // Cache
    getData: <TData = unknown>() => TData | undefined;
    removeQueries: () => void;
    cancelQueries: () => Promise<void>;

    refetch: (options?: { force?: boolean }) => Promise<void>;

    getQueryState: <TData = unknown, TError = Error>() =>
        | import('@tanstack/react-query').QueryState<TData, TError>
        | undefined;
}
