// import type { Dayjs } from 'dayjs';

export type Id = string;
export type Ids = Array<Id>;

export type GroupKey = string;

// type AnyValue =
//     | string
//     | number
//     | boolean
//     | Array<unknown>
//     | Record<string, unknown>
//     | Date
//     | Dayjs
//     | null
//     | undefined;

export type ItemBase = {
    id: Id;
    [key: string]: any;
};

export type OptionsBucket<T extends ItemBase> = {
    group: GroupKey;
    items: Array<T>;
};

export type Collections<T extends ItemBase> = Record<GroupKey, T[]>;

export type BasketState = {
    selected: Ids;
};

export type Action =
    | { type: 'ADD'; ids: Ids }
    | { type: 'REMOVE'; ids: Ids }
    | { type: 'TOGGLE'; id: Id }
    | { type: 'SET'; ids: Ids }
    | { type: 'CLEAR' };

// internal indexed record
export type IndexedItem<T extends ItemBase> = {
    group: GroupKey;
    item: T;
};
