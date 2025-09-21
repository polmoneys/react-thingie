import { type HTMLAttributes, type ReactNode, useEffect, useRef } from 'react';

import { FocusScope } from '@react-aria/focus';
import ReactDOM from 'react-dom';

import { clsx } from '../utils';

import styles from './index.module.css';

/*

credits https://jjenzz.com/avoid-global-state-colocate/

 */

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
    onClose: () => void;
    children?: ReactNode;
}

export default function Dialog({ onClose, children, ...props }: DialogProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const onClick = (event: MouseEvent) => {
            const dialog = ref.current;
            if (!dialog?.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('click', onClick, { capture: true });
        return () => {
            document.removeEventListener('click', onClick, {
                capture: true,
            });
        };
    });

    return ReactDOM.createPortal(
        <div
            {...props}
            ref={ref}
            className={clsx(props.className, styles.dialog)}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
        >
            <FocusScope contain restoreFocus autoFocus>
                {children}
            </FocusScope>
        </div>,
        document.body,
    );
}
