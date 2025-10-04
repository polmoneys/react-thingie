import type { DOMAttributes, ReactNode } from 'react';

export interface RenderProp {
    isCaptionShown: boolean;
    toggleCaption: () => void;
    triggerProps: Record<string, string | boolean>;
}

export interface RenderPropCaption extends Omit<RenderProp, 'triggerProps'> {
    onClose: () => void;
    captionProps: Record<string, string | boolean>;
    keyboardProps: DOMAttributes<any>;
}

export interface TldrProps {
    id: string;
    children: ({
        isCaptionShown,
        toggleCaption,
        triggerProps,
    }: RenderProp) => ReactNode;
    caption: ({
        isCaptionShown,
        toggleCaption,
        captionProps,
        keyboardProps,
    }: RenderPropCaption) => ReactNode;
    position?:
        | 'bottom left'
        | 'bottom center'
        | 'bottom right'
        | 'middle left'
        | 'middle center'
        | 'middle right'
        | 'top left'
        | 'top center'
        | 'top right';
    align?:
        | 'bottom left'
        | 'bottom center'
        | 'bottom right'
        | 'middle left'
        | 'middle center'
        | 'middle right'
        | 'top left'
        | 'top center'
        | 'top right';
    sameWidthCaption?: boolean;
    autoFlipVertically?: boolean;
    autoFlipHorizontally?: boolean;
    inline?: boolean;
    backdrop?: string;
}
