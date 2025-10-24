import type { ReactNode } from 'react';

import { has } from '../../utils';

import Group from './Group';

interface SummaryProps {
    summary: string;
    children: ReactNode;
    className?: string;
    name?: string;
}

function Disclosure({ summary, children, name, className }: SummaryProps) {
    return (
        <details
            {...(has(name) && { name })}
            {...(has(className) && {
                className: className,
            })}
        >
            <summary>{summary}</summary>
            {children}
        </details>
    );
}

export default Object.assign(Disclosure, {
    Group,
});
