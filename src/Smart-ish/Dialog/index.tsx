import { type CSSProperties, type ReactNode, useRef } from 'react';

import { FocusScope } from '@react-aria/focus';
import { useKeyboard } from 'react-aria';
import ReactDOM from 'react-dom';

import { clsx, has } from '../../utils';

import type { DialogProps } from './interfaces';

import styles from './index.module.css';

function Dialog({ onClose, children, isOpen, ...props }: DialogProps) {
    const ref = useRef<HTMLDivElement | null>(null);

    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            if (event.key === 'Escape' && isOpen) {
                event.preventDefault();
                onClose();
            }
        },
    });

    if (!isOpen) return null;

    return ReactDOM.createPortal(
        <div
            {...props}
            ref={ref}
            className={clsx(props.className, styles.dialog)}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            {...keyboardProps}
        >
            <FocusScope contain restoreFocus autoFocus>
                {children}
            </FocusScope>
        </div>,
        document.body,
    );
}

const Title = ({
    children,
    className,
    dangerous: style,
}: {
    children: ReactNode;
    className?: string;
    dangerous?: CSSProperties;
}) => (
    <header
        {...(className !== undefined && { className })}
        {...(has(style) && { style })}
    >
        {children}
    </header>
);

const Content = ({
    children,
    className,
    dangerous: style,
}: {
    children: ReactNode;
    className?: string;
    dangerous?: CSSProperties;
}) => (
    <div
        className={clsx(styles.content, className)}
        {...(has(style) && { style })}
    >
        {children}
    </div>
);

const Actions = ({
    children,
    className,
    dangerous: style,
}: {
    children: ReactNode;
    className?: string;
    dangerous?: CSSProperties;
}) => (
    <footer
        {...(className !== undefined && { className })}
        {...(has(style) && { style })}
    >
        {children}
    </footer>
);

export default Object.assign(Dialog, {
    Actions,
    Title,
    Content,
});
