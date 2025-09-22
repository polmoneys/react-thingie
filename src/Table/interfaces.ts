import type { ComponentProps } from 'react';

export type Column<T> = {
    field: keyof T;
    render: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
    label?: string;
};

export type RowHeaderProps<T> = {
    gridTemplateColumns: string;
    columns: Column<T>[];
    gap?: string;
    id?: string;
};

export type RowProps<T> = {
    gridTemplateColumns: string;
    columns: Column<T>[];
    row: T;
    rowIndex?: number;
    gap?: string;
    selected?: boolean;
    label: string;
    id?: string;
    onSelect?: () => void;
    selectedBackgroundColor?: string;
};

export type RowsProps<T> = {
    gridTemplateColumns: string;
    columns: Column<T>[];
    rows: T[];
    rowIndex?: number;
    gap?: string;
    selected?: boolean;
    selectedBackgroundColor?: string;
    label: string;
    id?: string;
} & ComponentProps<'div'>;
