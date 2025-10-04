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
