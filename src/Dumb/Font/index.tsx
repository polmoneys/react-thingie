import { useMemo } from 'react';

import type { Unit } from '../../Thingie/interfaces';
import { clsx, has } from '../../utils';

import type { FontProps } from './interfaces';

import styles from './index.module.css';

function Font(props: FontProps) {
    const {
        component: Component = 'p',
        dangerousColor,
        dangerousTransform,
        children,
        options = [],
        className,
        size = 'md',
        kind = 'poppins-regular',
        clamp = 0,
        inherit,
        px,
        ...rest
    } = props;

    const shouldClamp = clamp !== 0;

    const classNames = useMemo(
        () =>
            clsx(
                className,
                styles[`${kind}`],
                styles[size],
                options.includes('number') && styles.numeric,
                options.includes('inert') && styles.inert,
                options.includes('AA') && styles.uppercase,
                options.includes('Aa') && styles.capitalize,
                options.includes('breakWord') && styles.break,
                options.includes('hyphenate') && styles.hyphenate,
                options.includes('maskX') && styles.maskX,
                options.includes('maskY') && styles.maskY,
                shouldClamp && styles.clamp,
                inherit && styles.inherit,
            ),
        [className, kind, size, options, shouldClamp, inherit],
    );

    return (
        <Component
            {...rest}
            style={{
                ...(has(dangerousColor) && { color: dangerousColor }),
                ...(has(dangerousTransform) && {
                    transform: dangerousTransform,
                }),
                ...(has(px) && { padding: `0 ${px}` }),
                ...(shouldClamp && { '--clamp-lines': clamp }),
            }}
            className={classNames}
        >
            {children}
        </Component>
    );
}

const Bold = (props: FontProps) => <Font {...props} kind="poppins-semibold" />;
const Thin = (props: FontProps) => <Font {...props} kind="poppins-light" />;
const Italic = (props: FontProps) => (
    <Font {...props} kind="poppins-medium-italic" />
);

const Grotesk = (props: FontProps) => <Font {...props} kind="grotesk" />;

const Tooltip = ({ maxWidth, ...props }: FontProps & { maxWidth: Unit }) => (
    <div className={styles.ellipsis} style={{ width: maxWidth }}>
        <Font {...props} />
    </div>
);

export default Object.assign(Font, {
    Bold,
    Thin,
    Italic,
    Grotesk,
    Tooltip,
});
