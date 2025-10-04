import type { ReactElement } from 'react';

export interface RenderProp<TChildrenProps, TElement = unknown> {
    (props: TChildrenProps): ReactElement<TElement>;
}

// type RenderProp<T> = (props: T) => ReactNode;

export type Mood = 'neutral' | 'positive' | 'negative';

export type CssVar = `var(--${string})`;
export type NumericVar = `${number} ${CssVar}`;
export type StringVar = `${number}${UnitSuffix} ${CssVar}`;
export type MinMax = `min(${string})` | `max(${string})`;
export type Calc = `calc(${string})`;
export type UnitSuffix = 'em' | 'rem' | 'px' | '%' | 'fr' | 'vh' | 'vw';
export type WithSuffix = `${string}${UnitSuffix}` & `${number}${UnitSuffix}`;

export type Unit =
    | 0
    | CssVar
    | NumericVar
    | StringVar
    | MinMax
    | Calc
    | WithSuffix
    | 'start'
    | 'center'
    | 'end'
    | 'fit-content'
    | 'wrap';
