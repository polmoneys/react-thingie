import { useState } from 'react';

import { clsx } from '../../utils';

import type { ButtonGroupProps } from './interfaces';

import styles from './index.module.css';

export default function ButtonGroup(props: ButtonGroupProps) {
    const {
        initial = 0,
        className,
        direction = 'horizontal',
        children,
    } = props;

    const [active, setActive] = useState(initial);

    return (
        <div
            className={clsx(
                className,
                styles.root,
                direction === 'vertical' && styles.vertical,
            )}
        >
            {children &&
                children({
                    active,
                    setActive,
                })}
        </div>
    );
}
