import { Children, type ReactNode } from 'react';

import Button from '../Button';
import { clsx } from '../utils';

import styles from './Lite.module.css';

interface Props {
    id: string;
    label: ReactNode;
    children?: Array<ReactNode>;
    className?: string;
}

export default function PopoverLite(props: Props) {
    const { id, className, label, children } = props;

    if (!Array.isArray(Children)) console.warn('Provide 2 children');
    return (
        <div className={clsx(styles.popover, className)}>
            <Button
                id={id}
                className={styles.button}
                aria-label="User menu"
                aria-haspopup="true"
            >
                {label}
            </Button>
            <div className={styles.menu}>
                <div
                    className={styles.menuItems}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={id}
                >
                    {Children.map(children, (child, index) => {
                        return (
                            <div
                                className={styles.item}
                                role="menuitem"
                                key={index}
                                tabIndex={-1}
                            >
                                {child}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
