import {
    type UseMutationOptions,
    type UseQueryOptions,
} from '@tanstack/react-query';

export type Key = React.Key;

export type SelectionAPI<T> = {
    items: Array<T>;
    keyOf: (item: T) => Key;
    selectedKeys: Set<Key>;
    selectedCount: number;
    isSelected: (itemOrKey: T | Key) => boolean;
    toggle: (itemOrKey: T | Key) => void;
    add: (itemOrKey: T | Key) => void;
    remove: (itemOrKey: T | Key) => void;
    clear: () => void;
    exportSelected: () => Array<T>;
};

export type Serializer<T> = (v: T) => string;
export type Deserializer<T> = (raw: string) => T;

export interface CreateHooksOptions<T> {
    serialize?: Serializer<T>;
    deserialize?: Deserializer<T>;
    defaultValue?: T | null;
    defaultMutationOptions?: UseMutationOptions<void, unknown, T, unknown>;
    defaultQueryOptions?: UseQueryOptions<
        T | null,
        unknown,
        T | null,
        readonly [string]
    >;
}
