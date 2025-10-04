import { Children, type ReactElement, type ReactNode } from 'react';

import { useKeyboard } from 'react-aria';

import { clsx } from '../../utils';
import Button from '../Button';

import styles from './Lite.module.css';

interface RenderProp<TChildrenProps, TElement = unknown> {
    (props: TChildrenProps): ReactElement<TElement>;
}

interface Props {
    id: string;
    label: ReactNode;
    children: RenderProp<{
        onClose: () => void;
    }>;
    className?: string;
}

export default function PopoverLite(props: Props) {
    const { id, className, label, children } = props;

    const onClose = () =>
        (document.activeElement as HTMLElement | null)?.blur();
    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            if (event.key === 'Escape' || event.key === 'C') {
                onClose();
            }
        },
    });

    const rendered = children({ onClose });
    const items = Children.toArray(rendered);

    return (
        <div className={clsx(styles.popover, className)} {...keyboardProps}>
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
                    {items.map((child, index) => {
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
