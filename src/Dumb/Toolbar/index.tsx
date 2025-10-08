import type { CSSProperties } from 'react';
import { Separator, Toolbar as ToolbarReactAria } from 'react-aria-components';

import { clsx, has } from '../../utils';
import Group from '../Group';

import type { ToolBarProps } from './interfaces';

import styles from './index.module.css';

export default function ToolBar(
    props: ToolBarProps & {
        orientation?: 'vertical' | 'horizontal';
        dangerous?: CSSProperties;
        className?: string;
    },
) {
    const {
        label,
        children,
        orientation = 'horizontal',
        className,
        dangerous,
    } = props;
    return (
        <ToolbarReactAria
            orientation={orientation}
            aria-label={label}
            className={({ orientation }) =>
                clsx(
                    styles.root,
                    orientation === 'vertical' && styles.col,
                    className,
                )
            }
            {...(has(dangerous) && { style: dangerous })}
        >
            {children}
        </ToolbarReactAria>
    );
}

ToolBar.Group = ({
    label,
    children,
    separator,
}: ToolBarProps & { separator?: 'vertical' | 'horizontal' }) => (
    <>
        <Group.Row aria-label={label}>{children}</Group.Row>
        {has(separator) && (
            <Separator orientation={separator} className={styles.separator} />
        )}
    </>
);
