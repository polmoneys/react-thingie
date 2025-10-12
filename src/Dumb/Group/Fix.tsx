import type { ReactNode } from 'react';

export default function Fix({
    x = 0,
    y = 0,
    children,
}: {
    x?: number;
    y?: number;
    children: ReactNode;
}) {
    return (
        <div
            style={{
                transform: `translate(${x}px, ${y}px)`,
            }}
        >
            {children}
        </div>
    );
}
