import {
    type ChangeEvent,
    type InputHTMLAttributes,
    type KeyboardEvent,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

import { FocusScope } from '@react-aria/focus';

import { clsx } from '../../utils';
import Button from '../Button';
import Icon from '../Icon';
import TextInputLabel from '../InputText';

import Chip from './Chip';

import styles from './index.module.css';

type Item = { id: string } & Record<string, string | number>;

export type AutocompLiteProps<T extends Item> = {
    options: T[];
    limit?: number;
    id?: string;
    value: T[];
    onChange: (next: T[]) => void;
    getItemLabel: (item: T) => string;
    match?: (item: T, query: string) => boolean;
    initialInput?: string;
    inputProps?: Omit<
        Partial<InputHTMLAttributes<HTMLInputElement>>,
        'onChange'
    >;
};

function Chips<T extends Item>({
    selected,
    onRemove,
    getItemLabel,
    limit = 3,
}: {
    selected: T[];
    onRemove: (index: number) => void;
    getItemLabel: (item: T) => string;
    limit?: number;
}) {
    const [showAll, toggle] = useState(false);

    const onToggle = () => toggle((prev) => !prev);

    if (!selected || selected.length === 0) return null;
    return (
        <FocusScope contain>
            <div className={styles.chips}>
                {selected.slice(0, limit ?? selected.length).map((s, i) => (
                    <Chip
                        key={s.id}
                        className={styles.chip}
                        onClick={(event) => {
                            event.stopPropagation();
                            onRemove(i);
                        }}
                        end={<Icon.X circle={false} size={24} />}
                    >
                        {getItemLabel(s)}
                    </Chip>
                ))}
                {selected.length > limit && (
                    <Button onClick={onToggle}>
                        {!showAll ? `+ ${selected.length - limit}` : 'Hide'}
                    </Button>
                )}
            </div>
        </FocusScope>
    );
}

function Options<T extends Item>({
    show,
    items,
    onSelect,
    highlightIndex,
    getItemLabel,
    limit,
}: {
    show: boolean;
    items: T[];
    onSelect: (item: T) => void;
    highlightIndex: number;
    getItemLabel: (item: T) => string;
    limit?: number;
}) {
    if (!show || items.length === 0) return null;
    return (
        <div className={styles.results} role="listbox">
            {items.slice(0, limit ?? items.length).map((it, idx) => (
                <div
                    key={it.id}
                    role="option"
                    aria-selected={idx === highlightIndex}
                    className={clsx(
                        styles.suggestion,
                        idx === highlightIndex && styles.highlighted,
                    )}
                    onMouseDown={() => onSelect(it)}
                >
                    {getItemLabel(it)}
                </div>
            ))}
        </div>
    );
}

export default function AutocompLiteMultiple<T extends Item>(
    props: AutocompLiteProps<T>,
) {
    const {
        options,
        limit = 2,
        id = 'autocomplete-',
        value: selected = [],
        onChange,
        getItemLabel,
        match,
        initialInput = '',
        inputProps = {},
    } = props;

    const [inputValue, setInputValue] = useState<string>(initialInput ?? '');
    const [suggestions, setSuggestions] = useState<T[]>([]);
    const [highlightIndex, setHighlightIndex] = useState<number>(-1);
    const [showSuggestion, setShowSuggestion] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    const labelFor = useCallback(
        (item: T) => getItemLabel(item),
        [getItemLabel],
    );

    const matchItem = useCallback(
        (item: T, q: string) =>
            match
                ? match(item, q)
                : labelFor(item).toLowerCase().includes(q.toLowerCase()),
        [labelFor, match],
    );

    const openSuggestions = (filtered: T[]) => {
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
            (s) => matchItem(s, v) && !selected.some((sel) => sel.id === s.id),
        );
        openSuggestions(filtered);
    };

    const addSelected = (itemToAdd: T) => {
        if (!itemToAdd) return;
        if (selected.some((s) => s.id === itemToAdd.id)) {
            setInputValue('');
            setShowSuggestion(false);
            inputRef.current?.focus();
            return;
        }
        onChange([...selected, itemToAdd]);
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
            // free-text creation (optional)
            // if (e.key === 'Enter' && inputValue.trim()) {
            //   e.preventDefault();
            //   // you could map this into a T via a factory if you want
            // }
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

    const onSuggestionMouseDown = (item: T) => addSelected(item);

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

    useEffect(() => {
        if (inputValue.trim() === '') return;
        const filtered = options.filter(
            (s) =>
                matchItem(s, inputValue) &&
                !selected.some((sel) => sel.id === s.id),
        );
        setSuggestions(filtered);
        setHighlightIndex(filtered.length > 0 ? 0 : -1);
        setShowSuggestion(filtered.length > 0);
    }, [options, selected, inputValue, matchItem]);

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
                    selected={selected}
                    onRemove={removeSelectedAt}
                    getItemLabel={labelFor}
                    limit={limit}
                />

                <TextInputLabel
                    id={id}
                    label=""
                    ref={inputRef}
                    onChange={() => ({})}
                    onChangeNative={(event: ChangeEvent<HTMLInputElement>) =>
                        onInputChange((event.target as HTMLInputElement).value)
                    }
                    {...inputProps}
                    onKeyDown={onInputKeyDown}
                    placeholder={
                        selected.length === 0
                            ? 'Search'
                            : `${selected.length} selected `
                    }
                    aria-autocomplete="list"
                    aria-expanded={showSuggestion}
                    aria-haspopup="listbox"
                />
            </div>

            <Options
                show={showSuggestion && suggestions.length > 0}
                items={suggestions}
                onSelect={onSuggestionMouseDown}
                highlightIndex={highlightIndex}
                getItemLabel={labelFor}
                limit={limit}
            />
        </div>
    );
}
