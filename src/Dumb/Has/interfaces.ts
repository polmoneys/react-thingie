import type { ReactNode } from 'react';

import type { LooseT } from '../../interfaces';

export type HTMLSelector = LooseT<
    | 'img'
    | 'video'
    | 'audio'
    | 'canvas'
    | 'svg'
    | 'a'
    | 'button'
    | 'input'
    | 'textarea'
    | 'select'
    | 'form'
    | 'label'
    | 'div'
    | 'span'
    | 'p'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'header'
    | 'footer'
    | 'nav'
    | 'main'
    | 'aside'
    | 'section'
    | 'article'
    | 'ul'
    | 'ol'
    | 'li'
    | 'table'
    | 'tr'
    | 'td'
    | 'th'
    | 'iframe'
    | 'embed'
    | 'object'
>;

export type CSSValue = string | number;

export type Condition = {
    has: HTMLSelector;
    styles?: Record<string, CSSValue>;
    vars?: Record<string, CSSValue>;
};

export type ConditionalStyleProps = {
    conditions: Condition[];
    children: ReactNode;
    className?: string;
    component?: 'div' | 'article' | 'section' | 'main' | 'aside';
    baseVars?: Record<string, CSSValue>;
};
