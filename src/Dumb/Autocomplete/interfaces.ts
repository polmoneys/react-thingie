import type { CSSProperties, InputHTMLAttributes } from 'react';

type Item = string;
type Items = Array<Item>;

export interface ChipsProps {
    selected: Items;
    onRemove: (item: number) => void;
    limit: number;
}

export type BasicItem = {
    id: string | number;
    label: string;
    description?: string;
};

export interface AutocompLiteProps {
    options: Items;
    value: Items;
    onChange: (selection: Items) => void;
    onChangeQuery?: (query: string) => void;
    id: string;
    limit?: number;
    inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
    dangerous?: CSSProperties;
    disabledOptions?: Items;
}

export interface OptionsProps {
    items: Items;
    show: boolean;
    onChange: (item: string) => void;
    highlightIndex: number;
    disabledOptions?: Items;
}
