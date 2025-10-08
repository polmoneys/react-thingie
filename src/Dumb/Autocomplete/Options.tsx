import { clsx } from '../../utils';

import type { OptionsProps } from './interfaces';

import styles from './index.module.css';

export default function Options(props: OptionsProps) {
    const {
        show,
        items,
        onChange,
        highlightIndex,
        disabledOptions = [],
    } = props;

    if (!show) return null;
    const disabledSet = new Set(disabledOptions);

    return (
        <div className={styles.results} role="listbox">
            {items.map((suggestion, idx) => {
                const disabled = disabledSet.has(suggestion);

                return (
                    <div
                        key={suggestion}
                        role="option"
                        aria-selected={idx === highlightIndex}
                        className={clsx(
                            styles.suggestion,
                            idx === highlightIndex && styles.highlighted,
                            disabled && styles.disabled,
                        )}
                        onMouseDown={() => {
                            if (!disabled) onChange(suggestion);
                        }}
                    >
                        {suggestion} {disabled ? '- Not yet public' : ''}
                    </div>
                );
            })}
        </div>
    );
}
