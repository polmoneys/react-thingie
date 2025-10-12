import {
    type KeyboardEvent,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';

import { clsx, has } from '../../utils';

import type { AutocompLiteOptionsListProps } from './interfaces';
import AutocompLiteSplitOption from './Option';

import styles from './index.module.css';

export default function OptionsList({
    filteredOptions,
    selected,
    toggleOption,
    // renderOption,
    idPrefix = 'autocomplete',
    containerClassName,
    query,
}: AutocompLiteOptionsListProps) {
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    useEffect(() => {
        if (filteredOptions.length === 0) {
            setHighlightedIndex(-1);
            return;
        }
        if (highlightedIndex >= filteredOptions.length) {
            setHighlightedIndex(filteredOptions.length - 1);
        }
    }, [filteredOptions, highlightedIndex]);

    const listRef = useRef<HTMLDivElement | null>(null);
    const optionRefs = useRef<Map<number, HTMLDivElement | null>>(new Map());

    // derived for O(1) selected checks
    const selectedIds = useMemo(() => {
        const s = new Set(selected.map((s) => s.id));
        return s;
    }, [selected]);

    function handleKeyDown(e: KeyboardEvent) {
        if (!filteredOptions || filteredOptions.length === 0) return;

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                const next = Math.min(
                    filteredOptions.length - 1,
                    Math.max(0, prev + 1),
                );
                scrollIntoViewIndex(next);
                return next;
            });
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setHighlightedIndex((prev) => {
                const next = Math.max(0, prev - 1);
                scrollIntoViewIndex(next);
                return next;
            });
        } else if (e.key === 'Home') {
            e.preventDefault();
            setHighlightedIndex(0);
            scrollIntoViewIndex(0);
        } else if (e.key === 'End') {
            e.preventDefault();
            setHighlightedIndex(filteredOptions.length - 1);
            scrollIntoViewIndex(filteredOptions.length - 1);
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (
                highlightedIndex >= 0 &&
                highlightedIndex < filteredOptions.length
            ) {
                const option = filteredOptions[highlightedIndex];
                toggleOption(option);
            }
        }
    }

    function scrollIntoViewIndex(idx: number) {
        const el = optionRefs.current.get(idx);
        if (el && listRef.current) {
            // use DOM scrolling so that keyboard navigation keeps element visible
            const parent = listRef.current;
            const elRect = el.getBoundingClientRect();
            const parentRect = parent.getBoundingClientRect();
            if (elRect.top < parentRect.top) {
                el.scrollIntoView({ block: 'nearest' });
            } else if (elRect.bottom > parentRect.bottom) {
                el.scrollIntoView({ block: 'nearest' });
            }
        }
    }

    function onSelectOption(idx: number) {
        const option = filteredOptions[idx];
        if (!option) return;
        toggleOption(option);
        setHighlightedIndex(idx);
        // focus the list so keyboard interactions continue to work
        listRef.current?.focus();
    }

    return (
        <div
            ref={listRef}
            role="listbox"
            aria-activedescendant={
                highlightedIndex >= 0
                    ? `${idPrefix}-option-${highlightedIndex}`
                    : undefined
            }
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={clsx(styles.results, containerClassName)}
        >
            {filteredOptions.map((opt, idx) => {
                const selectedState = selectedIds.has(opt.id);
                const disabled = Boolean(opt.disabled);
                const highlighted = idx === highlightedIndex;
                // const content = renderOption
                //     ? renderOption(opt, {
                //           selected: selectedState,
                //           highlighted,
                //           disabled,
                //       })
                //     : defaultContent;

                return (
                    <AutocompLiteSplitOption
                        id={`${idPrefix}-option-${idx}`}
                        position={idx}
                        {...(has(optionRefs) && {
                            optionRefs,
                        })}
                        query={query}
                        key={opt.id}
                        onSelect={() => onSelectOption(idx)}
                        isSelected={selectedState}
                        isDisabled={disabled}
                        isHighlighted={highlighted}
                    >
                        {opt.full}
                    </AutocompLiteSplitOption>
                );
            })}
        </div>
    );
}
