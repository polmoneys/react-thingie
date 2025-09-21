import { useState } from 'react';

import Button from '../Button';

import Chip from './Chip';
import type { ChipsProps } from './interfaces';

import styles from './index.module.css';

export default function Chips(props: ChipsProps) {
    const { selected, onRemove, limit } = props;

    const [showAll, toggle] = useState(false);

    const onToggle = () => toggle((prev) => !prev);
    if (selected.length === 0) return null;

    return (
        <div className={styles.chips}>
            {selected
                .slice(0, showAll ? selected.length : limit)
                .map((item, i) => (
                    <Chip
                        key={item + i}
                        onClick={(e) => {
                            e.stopPropagation();
                            onRemove(i);
                        }}
                    >
                        {item}
                    </Chip>
                ))}
            {selected.length > limit && (
                <Button onClick={onToggle}>
                    {!showAll ? `+ ${selected.length - limit}` : 'Hide'}
                </Button>
            )}
        </div>
    );
}
