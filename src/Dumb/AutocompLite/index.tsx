import { useRef } from 'react';

import { useKeyboard } from 'react-aria';

import useClickContains from '../../utilities/useClickContains';
import { has } from '../../utils';
import TextInputLabel from '../InputText';

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
    } = props;

    const rootRef = useRef<HTMLDivElement | null>(null);

    useClickContains({
        ref: rootRef,
        onInside: () => onToggle(),
        onOutside: () => onToggle(),
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
                <div aria-live="polite" className="offscreen" role="status">
                    {a11y}
                </div>
            )}
            {showChips && (
                <Chips
                    selected={selected}
                    onRemove={(option) => toggleOption(option)}
                    limit={chipLimit ?? 3}
                />
            )}
            <div className={styles.root} {...keyboardProps}>
                <TextInputLabel
                    placeholder={placeholder}
                    gridTemplateRows="1fr 1fr"
                    gridTemplateColumns="1fr"
                    id={id}
                    label={label}
                    value={query}
                    onChange={(v) => setQuery(v)}
                    classNames={{ input: 'theme-inset' }}
                    // onKeyDown={onInputKeyDown}
                    autoComplete="off"
                    aria-autocomplete="list"
                    aria-expanded="true"
                    aria-haspopup="listbox"
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
