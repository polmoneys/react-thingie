import { type AriaAttributes, type ReactNode } from 'react';

export const sizeUnits = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

type FontKind =
    | 'grotesk'
    | 'poppins-light'
    | 'poppins-medium'
    | 'poppins-medium-italic'
    | 'poppins-semibold';

type HTMLHnTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HTMLtag = 'label' | 'span' | 'p' | 'b' | 'em' | 'strong' | 'time';

type FontSize = (typeof sizeUnits)[number];
type Option =
    | 'AA'
    | 'Aa'
    | 'date'
    | 'hyphenate'
    // user-select:none
    | 'inert'
    | 'breakWord'
    | 'maskX'
    | 'maskY'
    | 'number';

export interface FontProps extends AriaAttributes {
    component?: HTMLtag | HTMLHnTag;
    size?: FontSize;
    children: string | number | ReactNode;
    className?: string;
    options?: Array<Option>;
    dangerousColor?: string;
    dangerousTransform?: string;
    px?: string;
    kind?: FontKind;
    clamp?: number;
    inherit?: boolean;
    onClick?: () => void;
}
