import {
    type ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';

import type { TooltipOptions } from './interfaces';
import { TooltipContext } from '.';

export default function useTooltip(options: TooltipOptions = {}) {
    const context = useContext(TooltipContext);
    const {
        trigger = 'hover',
        offset = { x: 0, y: 0 },
        timeout = trigger === 'hover' ? 0 : 3000, // Default: hover stays, click auto-hides after 3s
    } = options;
    if (!context) {
        throw new Error('useTooltip must be used within TooltipProvider');
    }

    const { showTooltip, hideTooltip } = context;
    const targetRef = useRef<HTMLElement>(null);
    const clickOutsideRef = useRef<((e: MouseEvent) => void) | null>(null);

    const show = useCallback(
        (content: ReactNode) => {
            if (targetRef.current) {
                showTooltip(content, targetRef.current, timeout);
            }
        },
        [showTooltip, timeout],
    );

    const hide = useCallback(() => {
        hideTooltip();
        if (clickOutsideRef.current) {
            document.removeEventListener('click', clickOutsideRef.current);
            clickOutsideRef.current = null;
        }
    }, [hideTooltip]);

    const getProps = useCallback(
        (content: ReactNode) => {
            if (trigger === 'hover') {
                return {
                    onMouseEnter: () => show(content),
                    onMouseLeave: hide,
                    ref: targetRef as any,
                };
            }

            // Click trigger
            return {
                onClick: (e: React.MouseEvent) => {
                    e.stopPropagation();
                    show(content);

                    // Setup click outside listener
                    setTimeout(() => {
                        clickOutsideRef.current = (event: MouseEvent) => {
                            if (
                                targetRef.current &&
                                !targetRef.current.contains(
                                    event.target as Node,
                                )
                            ) {
                                hide();
                            }
                        };
                        document.addEventListener(
                            'click',
                            clickOutsideRef.current,
                        );
                    }, 0);
                },
                ref: targetRef as any,
            };
        },
        [trigger, show, hide],
    );

    useEffect(() => {
        return () => {
            if (clickOutsideRef.current) {
                document.removeEventListener('click', clickOutsideRef.current);
            }
        };
    }, []);

    return { getProps, show, hide, targetRef };
}
