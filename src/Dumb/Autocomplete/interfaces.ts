import type { CSSProperties, InputHTMLAttributes } from 'react';

export interface ChipsProps {
    selected: Array<string>;
    onRemove: (item: number) => void;
    limit: number;
}

export type BasicItem = {
    id: string | number;
    label: string;
    description?: string;
};

export interface AutocompLiteProps {
    options: Array<string>;
    value: Array<string>;
    onChange: (selection: Array<string>) => void;
    onChangeQuery?: (query: string) => void;
    id: string;
    limit?: number;
    inputProps?: Partial<InputHTMLAttributes<HTMLInputElement>>;
    dangerous?: CSSProperties;
}

export interface OptionsProps {
    items: Array<string>;
    show: boolean;
    onChange: (item: string) => void;
    highlightIndex: number;
}
