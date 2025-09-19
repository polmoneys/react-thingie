import type {
    AriaAttributes,
    CSSProperties,
    KeyboardEvent,
    ReactNode,
} from 'react';

const CardRatio = ['auto', 'square', 'portrait', 'landscape'] as const;
type CardRatios = (typeof CardRatio)[number];

const HTMLCardTags = [
    'section',
    'article',
    'aside',
    'li',
    'div',
    'form',
] as const;
type HTMLCardTagsType = (typeof HTMLCardTags)[number];

export interface CardProps extends AriaAttributes {
    ratio?: CardRatios;
    children: ReactNode;
    dangerous?: CSSProperties;
    className?: string;
    component: HTMLCardTagsType;
    gradient?: string;
    onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void;
}

export interface CardTitleProps {
    icon?: ReactNode;
    children?: ReactNode;
    className?: string;
}
