import Button from '../../Dumb/Button';
import type { ButtonProps } from '../../Dumb/Button/interfaces';
import IconX from '../../Dumb/Icon/Icons/X';
import { clsx } from '../../utils';

import styles from './index.module.css';

export default function Chip(props: ButtonProps) {
    const { children, className, isActive, ...rest } = props;
    return (
        <Button
            {...rest}
            className={clsx(
                styles.chip,
                isActive && styles.isActive,
                className,
            )}
            end={<IconX circle={false} size={28} />}
        >
            {children}
        </Button>
    );
}
