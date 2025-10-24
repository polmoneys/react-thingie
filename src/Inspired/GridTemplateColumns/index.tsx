import { useMemo } from 'react';

import type { Unit } from '../../interfaces';
import { clsx, has } from '../../utils';

import type { ColumnsGridProps } from './interfaces';
import { computeResponsiveValues } from './utils';

import styles from './index.module.css';

export default function GridTemplateColumns(props: ColumnsGridProps) {
    const {
        children,
        gap,
        padding,
        gridTemplateColumns,
        className,
        component: Component = 'div',
        dangerous,
        breakEqualHeight,
        gradient,
        ...rest
    } = props;

    const style = useMemo(() => {
        const paddingValues = computeResponsiveValues<Unit>(padding);
        const gapValues = computeResponsiveValues<Unit>(gap);
        const gridTemplateColumnsValues =
            computeResponsiveValues<string>(gridTemplateColumns);
        const gradientValues = computeResponsiveValues<string>(gradient);

        const customStyle = {
            '--hug-padding': paddingValues.xs,
            '--hug-padding-sm': paddingValues.sm,
            '--hug-padding-md': paddingValues.md,
            '--hug-padding-lg': paddingValues.lg,
            '--hug-padding-xl': paddingValues.xl,
            '--hug-gap': gapValues.xs,
            '--hug-gap-sm': gapValues.sm,
            '--hug-gap-md': gapValues.md,
            '--hug-gap-lg': gapValues.lg,
            '--hug-gap-xl': gapValues.xl,
            '--hug-grid-template-columns': gridTemplateColumnsValues.xs,
            '--hug-grid-template-columns-sm': gridTemplateColumnsValues.sm,
            '--hug-grid-template-columns-md': gridTemplateColumnsValues.md,
            '--hug-grid-template-columns-lg': gridTemplateColumnsValues.lg,
            '--hug-grid-template-columns-xl': gridTemplateColumnsValues.xl,
            '--hug-gradient': gradientValues.xs,
            '--hug-gradient-sm': gradientValues.sm,
            '--hug-gradient-md': gradientValues.md,
            '--hug-gradient-lg': gradientValues.lg,
            '--hug-gradient-xl': gradientValues.xl,
            ...(has(breakEqualHeight) && { alignItems: 'start' }),
        };

        return has(dangerous)
            ? {
                  ...dangerous,
                  ...customStyle,
                  ...(has(breakEqualHeight) && { alignItems: 'start' }),
              }
            : customStyle;
    }, [
        breakEqualHeight,
        dangerous,
        gap,
        gradient,
        gridTemplateColumns,
        padding,
    ]);

    return (
        <Component
            className={clsx(styles.columns, className)}
            style={style}
            {...rest}
        >
            {children}
        </Component>
    );
}
