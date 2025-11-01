import {
    createContext,
    type CSSProperties,
    type ReactNode,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { clsx } from '../../utils';

import type { TooltipContextValue, TooltipPosition } from './interfaces';

import styles from './index.module.css';

export const TooltipContext = createContext<TooltipContextValue | null>(null);

export default function TooltipProvider({ children }: { children: ReactNode }) {
    const [content, setContent] = useState<ReactNode | null>(null);
    const [coords, setCoords] = useState<TooltipPosition | null>(null);
    const [visible, setVisible] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
    const autoHideTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    const showTooltip = useCallback(
        (
            tooltipContent: ReactNode,
            target: HTMLElement,
            autoHideTimeout?: number,
        ) => {
            const rect = target.getBoundingClientRect();
            setCoords({
                x: rect.left + rect.width / 2,
                y: rect.top,
            });
            setContent(tooltipContent);

            // Clear any existing auto-hide timeout
            if (autoHideTimeoutRef.current) {
                clearTimeout(autoHideTimeoutRef.current);
            }

            // Slight delay for animation
            clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
                setVisible(true);

                // Set auto-hide timeout if specified
                if (autoHideTimeout && autoHideTimeout > 0) {
                    autoHideTimeoutRef.current = setTimeout(() => {
                        hideTooltip();
                    }, autoHideTimeout);
                }
            }, 10);
        },
        [],
    );

    const hideTooltip = useCallback(() => {
        setVisible(false);
        clearTimeout(timeoutRef.current);

        // Clear auto-hide timeout
        if (autoHideTimeoutRef.current) {
            clearTimeout(autoHideTimeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
            setContent(null);
            setCoords(null);
        }, 400); // Match transition duration
    }, []);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
            if (autoHideTimeoutRef.current) {
                clearTimeout(autoHideTimeoutRef.current);
            }
        };
    }, []);

    const style: CSSProperties = coords
        ? ({
              ['--element-x' as any]: coords.x,
              ['--element-y' as any]: coords.y,
          } as CSSProperties)
        : {};

    return (
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
            {children}
            {content && (
                <div
                    className={clsx(
                        styles['tooltip-container'],
                        visible && styles.visible,
                    )}
                    style={style}
                >
                    <output
                        className={styles['tooltip-popup']}
                        role="status"
                        aria-live="polite"
                    >
                        {content}
                    </output>
                </div>
            )}
            <style>{`

      `}</style>
        </TooltipContext.Provider>
    );
}
