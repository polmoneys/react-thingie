import { clsx } from '../../utils';
import Button from '../Button';
import type { ButtonProps } from '../Button/interfaces';

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
        >
            {children}
        </Button>
    );
}
