import type { CSSProperties, ReactNode } from 'react';

export interface MuaProps {
    centered?: boolean;
    dangerous?: CSSProperties;
    children: ReactNode;
    component?: 'div' | 'aside' | 'label';
    htmlFor?: string;
    className?: string;
}

export default function Mua({
    centered = true,
    dangerous,
    children,
    component: Component = 'div',
    ...rest
}: MuaProps) {
    return (
        <Component
            style={{
                ...(dangerous !== undefined && { ...dangerous }),
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.2em',
                ...(centered
                    ? {
                          placeContent: 'center',
                          placeItems: 'center',
                      }
                    : {
                          alignContent: 'center',
                      }),
            }}
            {...rest}
        >
            {children}
        </Component>
    );
}
