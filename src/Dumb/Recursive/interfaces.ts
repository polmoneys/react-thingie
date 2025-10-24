import type { ReactNode } from 'react';

export interface RecursiveItem<T = any> {
    id: string | number;
    children?: RecursiveItem<T>[];
    data?: T;
}

type RenderItem<T> = {
    item: RecursiveItem<T>;
    level: number;
    isExpanded: boolean;
    isSelected: boolean;
    children?: ReactNode;
    onClick: () => void;
    className: string;
};

export interface RecursiveProps<T = any> {
    items: RecursiveItem<T>[];
    multiple?: boolean;
    selectedIds?: Set<string | number>;
    expandedIds?: Set<string | number>;
    onToggle?: (
        id: string | number,
        isExpanded: boolean,
        level: number,
    ) => void;
    onSelect?: (id: string | number, level: number) => void;
    renderItem: (item: RenderItem<T>) => ReactNode;
    level?: number;
    indentSize?: number;
}
