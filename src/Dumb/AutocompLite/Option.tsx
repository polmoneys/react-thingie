import { clsx } from '../../utils';

import type { AutocompLiteOptionProps } from './interfaces';
import SplitMatch from './SplitMatch';

import styles from './index.module.css';

export default function AutocompLiteSplitOption(
    props: AutocompLiteOptionProps,
) {
    const {
        id,
        children,
        isHighlighted,
        isDisabled,
        query,
        isSelected,
        // optionRefs,
        position,
        onSelect,
    } = props;

    return (
        <div
            role="option"
            id={id}
            aria-selected={isHighlighted}
            className={clsx(
                styles.suggestion,
                isHighlighted && styles.highlighted,
                isDisabled && styles.disabled,
                isSelected && styles.selected,
            )}
            onMouseDown={() => {
                if (!isDisabled) onSelect(position);
            }}

            // ref={(el) => {
            //     if (optionRefs === null) return;
            //     if (el) {
            //         optionRefs.current.set(position, el);
            //     } else {
            //         optionRefs.current.delete(position);
            //     }
            // }}
        >
            <SplitMatch searchText={query}>{children}</SplitMatch>
        </div>
    );
}
