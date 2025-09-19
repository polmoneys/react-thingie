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

export type CssVar = `var(--${string})`;
export type NumericVar = `${number} ${CssVar}`;
export type MinMax = `min(${string})` | `max(${string})`;
export type Calc = `calc(${string})`;
export type UnitSuffix = 'em' | 'rem' | 'px' | '%' | 'fr' | 'vh' | 'vw';
export type WithSuffix = `${string}${UnitSuffix}` & `${number}${UnitSuffix}`;

export type Unit =
    | 0
    | CssVar
    | NumericVar
    | MinMax
    | Calc
    | WithSuffix
    | 'start'
    | 'center'
    | 'end'
    | 'fit-content'
    | 'wrap';
