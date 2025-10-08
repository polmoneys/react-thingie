import type { ComponentProps, CSSProperties, ReactNode } from 'react';

import type { Mood, RenderProp } from '../../interfaces';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'style'> {
    children: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    isIcon?: boolean;
    isText?: boolean;
    isActive?: boolean;
    isPending?: boolean;
    mood?: Mood;
    stretch?: boolean;
    unset?: boolean;
    dangerous?: CSSProperties;
}

export interface ButtonGroupProps {
    className?: string;
    id?: string;
    /** can be multiple id "myBillingId myNameId" */
    ariaLabelledby?: string;
    children: RenderProp<{
        active: number | undefined;
        setActive: (number: number) => void;
    }>;
    direction?: 'horizontal' | 'vertical';
    initial?: number | undefined;
}
