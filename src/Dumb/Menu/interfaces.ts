import type { ReactNode } from 'react';

export type DynamicItem = {
    id: string;
    name: string;
    onAction: () => void;
    children?: Array<any>;
    header?: ReactNode;
    separator?: boolean;
};

export type DynamicItems = Array<DynamicItem>;
