import type {
    ComponentProps,
    CSSProperties,
    ReactElement,
    ReactNode,
} from 'react';

export interface ButtonProps extends Omit<ComponentProps<'button'>, 'style'> {
    children: ReactNode;
    start?: ReactNode;
    end?: ReactNode;
    isIcon?: boolean;
    isText?: boolean;
    isActive?: boolean;
    stretch?: boolean;
    dangerous?: CSSProperties;
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
