import type { CSSProperties, ReactNode } from 'react';

import type { Calc, CssVar, MinMax, WithSuffix } from '../../interfaces';
import { clsx, has } from '../../utils';

import styles from './index.module.css';

interface Props {
    children: ReactNode;
    className?: string;
    width?: WithSuffix | Calc | MinMax;
    bg?: string | CssVar;
    p?: string | CssVar;
    m?: string | CssVar;
    color?: string | CssVar;
    gap?: string | CssVar;
    component?: 'div' | 'ul' | 'ol' | 'section' | 'form';
}

export default function Grid(props: Props) {
    const {
        children,
        width = '20em',
        bg,
        color,
        gap = '1em',
        p,
        m,
        className,
        component: Component = 'div',
    } = props;

    const options = {
        ...(has(width) && { ['--item-width']: width }),
        ...(has(bg) && { ['--item-bg']: bg }),
        ...(has(color) && { ['--item-color']: color }),
        ...(has(gap) && { ['--item-gap']: gap }),
        ...(has(p) && { ['--item-p']: p }),
        ...(has(m) && { ['--item-m']: m }),
    } as CSSProperties;

    return (
        <Component className={clsx(styles.grid, className)} style={options}>
            {children}
        </Component>
    );
}
