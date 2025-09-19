import type { ReactNode } from 'react';

export type PortalContextValue = {
    setPortalTarget: (target: HTMLElement | string | null) => void;
    portalTarget: HTMLElement | null;
};

export interface PortalProviderProps {
    children: ReactNode;
    fallbackPortalId?: string; // renamed prop
}

export interface PortalProps {
    children: ReactNode;
    onMount?: (target: HTMLElement) => void;
    onUnmount?: (target: HTMLElement) => void;
}
