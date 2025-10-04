import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import type { Unit } from '../../interfaces';

export const BREAKPOINTS = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
export type Breakpoint = (typeof BREAKPOINTS)[number];

export type ResponsiveProp<T> = Partial<Record<Breakpoint, T>>;
// Alias
export type R<T> = ResponsiveProp<T>;

type SpacingProps = {
    padding?: R<Unit>;
    gap?: R<Unit>;
};

type GridProps = {
    gridTemplateColumns?: R<Unit>;
};

export interface ColumnsGridProps
    extends HTMLAttributes<HTMLDivElement>,
        SpacingProps,
        GridProps {
    component?: ElementType;
    // component?: 'div' | 'ul' | 'ol' | 'section' | 'form';
    dangerous?: Record<string, Unit>;
    children?: ReactNode;
    gradient?: string;
}
