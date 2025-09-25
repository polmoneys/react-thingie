import { useCallback, useEffect, useRef } from 'react';

import { useKeyboard } from 'react-aria';

import { clsx } from '../utils';

import type { ActionSheetProps } from './interfaces';

import styles from './index.module.css';

export default function ActionSheet({
    isOpen,
    onOpenChange,
    trigger,
    unTrigger,
    children,
    className,
}: ActionSheetProps) {
    const rootRef = useRef<HTMLDivElement | null>(null);
    const sentinelRef = useRef<HTMLDivElement | null>(null);
    const firstMenuRef = useRef<HTMLElement | null>(null);

    const onClose = useCallback(() => {
        onOpenChange();
        sentinelRef.current?.scrollIntoView({
            behavior: 'smooth',
        });
    }, [onOpenChange]);

    useEffect(() => {
        if (!isOpen) {
            sentinelRef.current?.scrollIntoView({ behavior: 'smooth' });
        } else {
            firstMenuRef.current?.scrollIntoView({
                behavior: 'smooth',
            });
        }
    }, [isOpen]);

    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            console.log({ k: event.key, isOpen });
            if ((event.key === 'Escape' || event.key === 'C') && isOpen) {
                event.preventDefault();
                onClose();
            }
        },
    });

    return (
        <>
            {trigger?.({ isOpen })}

            <div
                ref={rootRef}
                className={clsx(styles.sheet, className)}
                data-open={isOpen ? 'true' : 'false'}
                aria-hidden={!isOpen}
                {...keyboardProps}
            >
                <div ref={sentinelRef} className={styles.sentinel} />

                <menu
                    ref={firstMenuRef}
                    className={styles.menu}
                    aria-label="Actions"
                >
                    {children}
                </menu>

                <menu className={styles.menu}>
                    {unTrigger({ isOpen, onClose })}
                </menu>
            </div>
        </>
    );
}
