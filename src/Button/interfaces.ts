import type { ComponentProps, ReactElement,ReactNode } from 'react';

export interface ButtonProps extends ComponentProps<'button'> {
    children: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    isIcon?: boolean;
    isText?: boolean;
    isActive?: boolean;
    color?: string;
}

interface RenderProp<TChildrenProps, TElement = unknown> {
    (props: TChildrenProps): ReactElement<TElement>;
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
