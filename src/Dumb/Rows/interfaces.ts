import type { ComponentProps } from 'react';

import type { Unit } from '../../interfaces';

export type Column<T> = {
    field: keyof T;
    render: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
    label?: string;
};

export type RowHeaderProps<T> = {
    gridTemplateColumns: string;
    columns: Column<T>[];
    id?: string;
    px: Unit;
};

export type RowProps<T> = {
    gridTemplateColumns: string;
    columns: Column<T>[];
    row: T;
    rowIndex?: number;
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
    selected?: boolean;
    selectedBackgroundColor?: string;
    label: string;
    id?: string;
    px: Unit;
} & ComponentProps<'div'>;
