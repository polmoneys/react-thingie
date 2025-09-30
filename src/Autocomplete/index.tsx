import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

import TextInputLabel from '../InputText';
import { clsx } from '../utils';

import Chips from './Chips';
import type { AutocompLiteProps } from './interfaces';
import Options from './Options';

import styles from './index.module.css';

export default function AutocompLite(props: AutocompLiteProps) {
    const {
        options,
        limit = 2,
        id = 'autocomplete-',
        value: selected = [],
        onChange,
        ...rest
    } = props;

    const [inputValue, setInputValue] = useState<string>('');
    const [suggestions, setSuggestions] = useState<Array<string>>([]);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const openSuggestions = (filtered: Array<string>) => {
        setSuggestions(filtered);
        setHighlightIndex(filtered.length > 0 ? 0 : -1);
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
        if (showSuggestion) {
            if (event.key === 'ArrowDown') {
                event.preventDefault();
                setHighlightIndex((prev) =>
                    prev < suggestions.length - 1 ? prev + 1 : prev,
                );
                return;
            }
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                setHighlightIndex((prev) => (prev > 0 ? prev - 1 : 0));
                return;
            }
            if (event.key === 'Enter' || event.key === 'Tab') {
                if (highlightIndex >= 0 && suggestions[highlightIndex]) {
                    event.preventDefault();
                    addSelected(suggestions[highlightIndex]);
                }
                return;
            }
            if (event.key === 'Escape') {
                setShowSuggestion(false);
                return;
            }
        } else {
            // when suggestion list hidden:
            if (event.key === 'Enter' && inputValuevent.trim()) {
                // allow creating new tags from free text
                event.preventDefault();
                addSelected(inputValuevent.trim());
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

    const onSuggestionMouseDown = (
        s: string, // use mouseDown to avoid losing focus before click
    ) => addSelected(s);
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
        <div className={styles.autocompLite}>
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
                        placeholder={
                            selected.length === 0
                                ? 'Search'
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
            />
        </div>
    );
}
