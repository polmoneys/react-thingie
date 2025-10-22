import { useCallback, useRef } from 'react';

import { useKeyboard } from 'react-aria';

import Alert from '../../Dumb/Alert';
import Icon from '../../Dumb/Icon';
import TextInputLabel from '../../Dumb/InputText';
import useClickContains from '../../utilities/useClickContains';
import { has } from '../../utils';

import Chips from './Chips';
import type { AutcompLiteProps } from './interfaces';
import OptionsList from './OptionsList';

import styles from './index.module.css';

export default function AutocompLite(props: AutcompLiteProps) {
    const {
        children,
        id,
        selected,
        placeholder,
        setQuery,
        query,
        a11y,
        options,
        toggleOption,
        label,
        onToggle,
        showPopover,
        showChips = false,
        chipLimit,
        isSticky,
    } = props;

    const rootRef = useRef<HTMLDivElement | null>(null);

    const onIn = useCallback(() => {
        return !showPopover ? onToggle() : () => ({});
    }, [showPopover, onToggle]);
    const onOut = useCallback(() => {
        return showPopover ? onToggle() : () => ({});
    }, [showPopover, onToggle]);

    useClickContains({
        ref: rootRef,
        onInside: onIn,
        onOutside: onOut,
    });

    const { keyboardProps } = useKeyboard({
        onKeyDown: (event) => {
            if ((event.key === 'Escape' || event.key === 'C') && showPopover) {
                event.preventDefault();
                onToggle();
            }
        },
    });

    return (
        <>
            {a11y.trim().length > 0 && (
                <Alert className="offscreen">{a11y}</Alert>
            )}
            {showChips && !isSticky && (
                <Chips
                    selected={selected}
                    onRemove={(option) => toggleOption(option)}
                    limit={chipLimit ?? 3}
                />
            )}
            <div ref={rootRef} className={styles.root} {...keyboardProps}>
                <TextInputLabel
                    placeholder={placeholder}
                    gridTemplateRows="1fr 1fr"
                    gridTemplateColumns="1fr"
                    id={id}
                    label={label}
                    value={query}
                    onChange={(v) => setQuery(v)}
                    classNames={{ input: 'theme-inset' }}
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded="true"
                    aria-haspopup="listbox"
                    endIcon={
                        showPopover ? (
                            <Icon.ChevronUp size={28} circle={false} />
                        ) : (
                            <Icon.ChevronDown size={28} circle={false} />
                        )
                    }
                />
                {showPopover ? (
                    <OptionsList
                        query={query}
                        filteredOptions={options}
                        selected={selected}
                        toggleOption={toggleOption}
                        idPrefix="dest"
                    />
                ) : null}
            </div>
            {has(children) ? children : null}
        </>
    );
}
