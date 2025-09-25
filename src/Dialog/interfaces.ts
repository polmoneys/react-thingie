import type { HTMLAttributes, ReactElement, ReactNode } from 'react';

interface RenderProp<TChildrenProps, TElement = unknown> {
    (props: TChildrenProps): ReactElement<TElement>;
}

export interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    isOpen: boolean;
    children?: ReactNode;
}

export type ActionSheetProps = {
    isOpen: boolean;
    onClose: () => void;
    trigger?: RenderProp<{
        isOpen: boolean;
    }>;
    children: ReactNode;
    unTrigger: RenderProp<{
        isOpen: boolean;
        onClose: () => void;
    }>;
    className?: string;
};
