import {
    type AriaAttributes,
    type ComponentProps,
    type ReactNode,
} from 'react';

import { clsx } from '../utils';

export interface AlertProps extends ComponentProps<'div'> {
    role?: 'alert' | 'status' | 'log' | 'none';
    live?: 'polite' | 'off' | 'assertive';
    relevant?: AriaAttributes['aria-relevant'];
    children: ReactNode;
    mood?: 'positive' | 'negative' | 'neutral';
}

function Alert(props: AlertProps) {
    const {
        role = 'status',
        live = 'polite',
        children,
        relevant = 'additions text',
        className,
        mood = 'neutral',
        ...groupProps
    } = props;

    return (
        <div
            {...groupProps}
            role={role}
            aria-live={live}
            aria-relevant={relevant}
            className={clsx(className, mood)}
        >
            {children}
        </div>
    );
}
export default Alert;
