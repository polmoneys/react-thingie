import type { ReactNode } from 'react';

export interface TooltipPosition {
    x: number;
    y: number;
}

export interface TooltipContextValue {
    showTooltip: (
        content: ReactNode,
        target: HTMLElement,
        timeout?: number,
    ) => void;
    hideTooltip: () => void;
}

export interface TooltipOptions {
    trigger?: 'hover' | 'click';
    offset?: { x: number; y: number };
    position?: 'top' | 'bottom' | 'left' | 'right';
    timeout?: number; // milliseconds before auto-hide, 0 = never
}
