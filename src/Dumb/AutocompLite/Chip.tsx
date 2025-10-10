import { clsx } from '../../utils';
import Button from '../Button';
import type { ButtonProps } from '../Button/interfaces';
import Icon from '../Icon';

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
            end={<Icon.X circle={false} size={28} />}
        >
            {children}
        </Button>
    );
}
