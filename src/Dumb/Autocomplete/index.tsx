import {
    type KeyboardEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { clsx, has } from '../../utils';
import TextInputLabel from '../InputText';

import Chips from './Chips';
import type { AutocompLiteProps } from './interfaces';
import Options from './Options';

import styles from './index.module.css';

export default function AutocompLite(props: AutocompLiteProps) {
    const {
        options,
        limit = 3,
        id = 'autocomplete-',
        value: selected = [],
        onChange,
        inputProps,
        dangerous,
        disabledOptions = [],
        ...rest
    } = props;

    const disabledSet = useMemo(
        () => new Set(disabledOptions),
        [disabledOptions],
    );

    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const itemsEmpty = () => suggestions.length === 0;

    const findFirstEnabledIndex = (items: string[]) =>
        items.findIndex((s) => !disabledSet.has(s));

    const findNextEnabled = (start: number, dir: 1 | -1) => {
        if (itemsEmpty()) return -1;
        let i = start;
        while (true) {
            i = i + dir;
            if (i < 0 || i >= suggestions.length) return start; // stop at current if none found
            if (!disabledSet.has(suggestions[i])) return i;
        }
    };

    const openSuggestions = (filtered: Array<string>) => {
        setSuggestions(filtered);
        const firstEnabled = findFirstEnabledIndex(filtered);
        setHighlightIndex(firstEnabled >= 0 ? firstEnabled : -1);
        setShowSuggestion(filtered.length > 0);
    };

    const onInputChange = (v: string) => {
        setInputValue(v);
        if (v.trim() === '') {
            setShowSuggestion(false);
            setSuggestions([]);
            setHighlightIndex(-1);
            return;
        }
        const filtered = options.filter(
            (s) =>
                s.toLowerCase().includes(v.toLowerCase()) &&
                !selected.includes(s),
        );
        openSuggestions(filtered);
    };

    const addSelected = (value: string) => {
        if (!value) return;

        if (disabledSet.has(value)) {
            // silently ignore or optionally show a small UI message
            inputRef.current?.focus();
            setInputValue('');
            setShowSuggestion(false);
            return;
        }

        if (selected.includes(value)) {
            setInputValue('');
            setShowSuggestion(false);
            inputRef.current?.focus();
            return;
        }
        onChange([...selected, value]);
        setInputValue('');
        setShowSuggestion(false);
        setSuggestions([]);
        setHighlightIndex(-1);
        inputRef.current?.focus();
    };

    const removeSelectedAt = (index: number) => {
        const next = selected.filter((_, i) => i !== index);
        onChange(next);
        inputRef.current?.focus();
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (showSuggestion && suggestions.length > 0) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setHighlightIndex((prev) => {
                    const start = prev >= 0 ? prev : -1;
                    return findNextEnabled(start, 1);
                });
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setHighlightIndex((prev) => {
                    const start = prev >= 0 ? prev : suggestions.length;
                    return findNextEnabled(start, -1);
                });
                return;
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
                if (highlightIndex >= 0 && suggestions[highlightIndex]) {
                    event.preventDefault();
                    const chosen = suggestions[highlightIndex];
                    if (!disabledSet.has(chosen)) {
                        addSelected(chosen);
                    }
                }
                return;
            }
            if (event.key === 'Escape') {
                setShowSuggestion(false);
                return;
            }
        } else {
            // when suggestion list hidden:
            if (event.key === 'Enter' && inputValue.trim()) {
                // allow creating new tags from free text, but not if that text is a disabled option
                event.preventDefault();
                const trimmed = inputValue.trim();
                if (!disabledSet.has(trimmed)) {
                    addSelected(trimmed);
                } else {
                    // do nothing (or show a message)
                    setInputValue('');
                    inputRef.current?.focus();
                }
                return;
            }
        }
        // Backspace deletes last chip when input is empty
        if (
            event.key === 'Backspace' &&
            inputValue === '' &&
            selected.length > 0
        ) {
            event.preventDefault();
            removeSelectedAt(selected.length - 1);
        }
    };

    const onSuggestionMouseDown = (s: string) => {
        if (disabledSet.has(s)) return;
        // use mouseDown to avoid losing focus before click
        addSelected(s);
    };

    useEffect(() => {
        const onClickOutside = (event: MouseEvent) => {
            if (!containerRef.current) return;
            if (!containerRef.current.contains(event.target as Node)) {
                setShowSuggestion(false);
            }
        };
        document.addEventListener('click', onClickOutside);
        return () => document.removeEventListener('click', onClickOutside);
    }, []);

    return (
        <div
            className={styles.autocompLite}
            {...(has(dangerous) && { style: dangerous })}
        >
            <div
                ref={containerRef}
                className={clsx(
                    styles.container,
                    selected.length === 0 && styles.empty,
                )}
                onClick={() => inputRef.current?.focus()}
            >
                <Chips
                    limit={limit}
                    selected={selected}
                    onRemove={removeSelectedAt}
                />
                <div>
                    <TextInputLabel
                        label=""
                        id={id}
                        ref={inputRef}
                        value={inputValue}
                        onChange={onInputChange}
                        onKeyDown={onInputKeyDown}
                        onFocus={() => {
                            if (inputValue === '') {
                                openSuggestions(options);
                            }
                        }}
                        placeholder={
                            selected.length === 0
                                ? (inputProps?.placeholder ?? 'Search')
                                : `${selected.length} selected`
                        }
                        aria-autocomplete="list"
                        aria-expanded={showSuggestion}
                        aria-haspopup="listbox"
                        {...rest}
                    />
                </div>
            </div>
            <Options
                show={showSuggestion && suggestions.length > 0}
                items={suggestions}
                onChange={onSuggestionMouseDown}
                highlightIndex={highlightIndex}
                disabledOptions={disabledOptions}
            />
        </div>
    );
}
