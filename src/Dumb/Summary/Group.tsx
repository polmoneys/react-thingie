import type { ReactNode } from 'react';

import Disclosure from '.';

import styles from './index.module.css';

interface SummaryGroupProps {
    items: Array<{
        summary: string;
        children: ReactNode;
        id: string;
        name: string;
    }>;
}

export default function Group(props: SummaryGroupProps) {
    const { items } = props;
    return (
        <div className={styles.group}>
            {items.map((child) => (
                <Disclosure key={child.id} {...child} />
            ))}
        </div>
    );
}
