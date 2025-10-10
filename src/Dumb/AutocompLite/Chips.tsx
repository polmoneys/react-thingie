import { useState } from 'react';

import Button from '../Button';
import ToolBar from '../Toolbar';

import Chip from './Chip';
import type { ChipsProps } from './interfaces';

import styles from './index.module.css';

export default function Chips(props: ChipsProps) {
    const { selected, onRemove, limit } = props;

    const [showAll, toggle] = useState(false);

    const onToggle = () => toggle((prev) => !prev);
    if (selected.length === 0) return null;

    return (
        <ToolBar label="Selected destinations" className={styles.chips}>
            <ToolBar.Group label="" className={styles.chips}>
                {selected
                    .slice(0, showAll ? selected.length : limit)
                    .map((item) => (
                        <Chip
                            key={`${item.id}-i`}
                            onClick={(e) => {
                                e.stopPropagation();
                                onRemove(item);
                            }}
                        >
                            {item.label}
                        </Chip>
                    ))}
            </ToolBar.Group>

            <ToolBar.Group label={`${showAll ? 'Hide some' : 'Show all'}`}>
                {selected.length > limit && (
                    <Button onClick={onToggle}>
                        {!showAll ? `+ ${selected.length - limit}` : 'Hide'}
                    </Button>
                )}
            </ToolBar.Group>
        </ToolBar>
    );
}
