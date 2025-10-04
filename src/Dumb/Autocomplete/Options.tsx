import { clsx } from '../../utils';

import type { OptionsProps } from './interfaces';

import styles from './index.module.css';

export default function Options(props: OptionsProps) {
    const { show, items, limit = 2, onChange, highlightIndex } = props;

    if (!show) return null;

    return (
        <div className={styles.results} role="listbox">
            {items.slice(0, limit).map((suggestion, idx) => (
                <div
                    key={suggestion}
                    role="option"
                    aria-selected={idx === highlightIndex}
                    className={clsx(
                        styles.suggestion,
                        idx === highlightIndex && styles.highlighted,
                    )}
                    onMouseDown={() => onChange(suggestion)}
                >
                    {suggestion}
                </div>
            ))}
        </div>
    );
}
