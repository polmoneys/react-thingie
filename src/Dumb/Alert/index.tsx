import {
    type AriaAttributes,
    type ComponentProps,
    type ReactNode,
} from 'react';

import { clsx } from '../../utils';

import styles from './index.module.css';

export interface AlertProps extends ComponentProps<'div'> {
    role?: 'alert' | 'status' | 'log' | 'none';
    live?: 'polite' | 'off' | 'assertive';
    relevant?: AriaAttributes['aria-relevant'];
    children: ReactNode;
    mood?: 'positive' | 'negative' | 'neutral';
    isPending?: boolean;
    block?: boolean;
}

function Alert(props: AlertProps) {
    const {
        role = 'status',
        live = 'polite',
        children,
        relevant = 'additions text',
        className,
        mood = 'neutral',
        isPending = false,
        block = false,
        ...groupProps
    } = props;

    return (
        <div
            {...groupProps}
            role={role}
            aria-live={live}
            aria-relevant={relevant}
            className={clsx(
                styles.alert,
                className,
                mood,
                isPending && styles.pending,
                block && styles.block,
            )}
        >
            {children}
        </div>
    );
}
export default Alert;
