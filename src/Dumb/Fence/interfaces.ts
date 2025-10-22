import { type ReactNode } from 'react';

export interface FenceProps {
    children: ReactNode;
    className?: string;
    options?: {
        threshold?: number;
        rootMargin?: string;
        triggerOnce?: boolean;
    };
    onChange?: (on: boolean) => void;
    component?: string;
    ifOn?: ReactNode;
}
