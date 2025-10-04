import type { ComponentProps, ReactElement } from 'react';

export interface RenderProp<TChildrenProps, TElement = unknown> {
    (props: TChildrenProps): ReactElement<TElement>;
}

export interface RadioProps extends Omit<ComponentProps<'input'>, 'children'> {
    id: string;
    children: RenderProp<{ checked: boolean }, HTMLElement>;
    onChangeAsString: (value: string) => void;
}

export interface GroupProps {
    children: Array<ReactElement>;
    initial: string | Array<string>;
    className?: string;
    gap?: string;
    radioSize?: string;
    renderLabel?: RenderProp<
        { checked: boolean; radioLabel: string },
        HTMLElement
    >;
    onChange: (selection: string) => void;
    direction?: 'row' | 'column';
}
