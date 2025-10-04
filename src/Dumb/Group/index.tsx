import { type CSSProperties, useMemo } from 'react';

import { clsx, has } from '../../utils';

import type GroupProps from './Interfaces';

import styles from './index.module.css';

const Group = (props: GroupProps) => {
    const {
        children,
        component: Component = 'div',
        gap = 'var(--gap-1)',
        size,
        variant = 'flex',
        alignItems,
        justifyContent,
        flexWrap,
        flexDirection,
        placeItems,
        dangerous,
        stretch,
        gridTemplateColumns,
        className,
        ...rest
    } = props;

    const options = useMemo(() => {
        const common = {
            gap,
            ...(has(alignItems) && {
                alignItems,
            }),
            ...(has(placeItems) && {
                placeItems,
            }),
        };
        if (variant === 'flex') {
            return {
                ...common,
                display: 'flex',
                ...(has(flexDirection) && {
                    flexDirection,
                }),
                ...(has(justifyContent) && {
                    justifyContent,
                }),
                ...(has(flexWrap) && { flexWrap }),

                ...(has(size) && { '--group-size': size }),
                ...(has(stretch) && {
                    width: '100%',
                    height: '100%',
                }),
            };
        }
        return {
            ...common,
            display: 'grid',
            ...(has(size) && {
                gridTemplateColumns: `repeat(auto-fit, minmax(min(100%,${size}), 1fr))`,
            }),
            ...(has(gridTemplateColumns) && {
                gridTemplateColumns,
            }),
            ...(has(stretch) && { width: '100%' }),
        };
    }, [
        alignItems,
        flexDirection,
        flexWrap,
        gap,
        gridTemplateColumns,
        justifyContent,
        placeItems,
        size,
        stretch,
        variant,
    ]) as CSSProperties;

    const classNames = clsx(className, has(size) && styles.size);

    return (
        <Component
            {...rest}
            className={classNames}
            style={{
                ...options,
                ...(has(dangerous) && dangerous),
            }}
        >
            {children}
        </Component>
    );
};

export default Group;

// Flex
Group.Row = (props: GroupProps) => {
    const { className, ...rest } = props;
    return <Group className={clsx(className, 'row')} {...rest} />;
};
Group.Col = (props: GroupProps) => {
    const { className, ...rest } = props;
    return <Group className={clsx(className, 'column')} {...rest} />;
};
Group.ColRow = (props: GroupProps) => {
    const { className, ...rest } = props;
    return <Group className={clsx(className, 'rowCol')} {...rest} />;
};
Group.Unit = (props: GroupProps) => {
    const { className, ...rest } = props;
    return <Group className={clsx(className, 'unit')} {...rest} />;
};

// Aspect ratio
Group.Square = (props: GroupProps) => {
    const { className, ...rest } = props;
    return <Group className={clsx(className, 'ratio', 'square')} {...rest} />;
};
Group.Landscape = (props: GroupProps) => {
    const { className, ...rest } = props;
    return (
        <Group className={clsx(className, 'ratio', 'landscape')} {...rest} />
    );
};
Group.Portrait = (props: GroupProps) => {
    const { className, ...rest } = props;
    return <Group className={clsx(className, 'ratio', 'portrait')} {...rest} />;
};

// Good ol' grid
Group.ArtDirection = (props: GroupProps) => {
    const { className, ...rest } = props;
    return (
        <Group
            {...rest}
            variant="grid"
            className={clsx(className, styles.ad)}
        />
    );
};
Group.ArtDirectionItem = (
    props: GroupProps & { span?: 2 | 3 | 4 | 6 | 12 },
) => {
    const { className, span = 4, ...rest } = props;
    return (
        <Group
            {...rest}
            variant="grid"
            className={clsx(className, styles.adItem, styles[`_${span}`])}
        />
    );
};
