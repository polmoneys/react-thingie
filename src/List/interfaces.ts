import type { CSSProperties, ElementType, ReactNode } from 'react';

import type { Unit } from '../Thingie/interfaces';

export type SlotProps = {
    start?: ReactNode;
    startWidth?: Unit;
    end?: ReactNode;
    endWidth?: Unit;
    component?: ElementType;
    children: ReactNode;
    gradient?: string | Unit;
    // dangerous="--end:calc(var(--slot-start) * 1.5);"
    dangerous?: CSSProperties;
    onSelect?: () => void;
};
