import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { createPortal as reactCreatePortal } from 'react-dom';

import type {
    PortalContextValue,
    PortalProps,
    PortalProviderProps,
} from './interfaces';

export default function createPortal(displayName?: string) {
    const Ctx = createContext<PortalContextValue | undefined>(undefined);
    Ctx.displayName = displayName ?? 'Portal';

    function PortalProvider({
        children,
        fallbackPortalId = 'fallback-portal-target',
    }: PortalProviderProps) {
        const fallbackRef = useRef<HTMLElement | null>(null);
        const [portalTarget, setPortalTargetState] =
            useState<HTMLElement | null>(null);

        const removeFallback = useCallback(() => {
            if (
                fallbackRef.current &&
                typeof document !== 'undefined' &&
                document.body.contains(fallbackRef.current)
            ) {
                document.body.removeChild(fallbackRef.current);
            }
            fallbackRef.current = null;
        }, []);

        const setPortalTarget = useCallback(
            (target: HTMLElement | string | null) => {
                // SSR guard
                if (typeof document === 'undefined') return;

                if (target === null) {
                    removeFallback();
                    setPortalTargetState(null);
                    return;
                }

                if (target instanceof HTMLElement) {
                    removeFallback();
                    setPortalTargetState(target);
                    return;
                }

                const el = document.getElementById(target);
                if (el) {
                    removeFallback();
                    setPortalTargetState(el);
                    return;
                }

                if (!fallbackRef.current) {
                    const el = document.createElement('div');
                    el.id = fallbackPortalId;
                    el.setAttribute('data-portal-fallback', 'true');
                    el.setAttribute('aria-hidden', 'true');
                    el.setAttribute('role', 'presentation');
                    document.body.appendChild(el);
                    fallbackRef.current = el;
                }

                setPortalTargetState(fallbackRef.current);
            },
            [fallbackPortalId, removeFallback],
        );

        useEffect(() => {
            return () => {
                removeFallback();
            };
        }, [removeFallback]);

        const value = useMemo(
            () => ({ portalTarget, setPortalTarget }),
            [portalTarget, setPortalTarget],
        );

        return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
    }

    function usePortal() {
        const ctx = useContext(Ctx);
        if (!ctx)
            throw new Error(
                `${Ctx.displayName} hook must be used inside its provider`,
            );
        return ctx;
    }

    function Portal({ children, onMount, onUnmount }: PortalProps) {
        const { portalTarget } = usePortal();
        const mountedTargetRef = useRef<HTMLElement | null>(null);

        useEffect(() => {
            if (portalTarget) {
                onMount?.(portalTarget);
                mountedTargetRef.current = portalTarget;
            }

            return () => {
                const mounted = mountedTargetRef.current;
                if (mounted) {
                    onUnmount?.(mounted);
                }
                mountedTargetRef.current = null;
            };
        }, [portalTarget, onMount, onUnmount]);

        if (!portalTarget) return null;
        return reactCreatePortal(children, portalTarget);
    }

    return { PortalProvider, usePortal, Portal } as const;
}
