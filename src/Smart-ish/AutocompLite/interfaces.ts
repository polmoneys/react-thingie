import type { Dispatch, ReactNode, RefObject, SetStateAction } from 'react';

export interface AutcompLiteProps {
    id: string;
    a11y: string;
    query: string;
    label: string;
    placeholder: string;
    setQuery: (query: string) => void;
    options: AutocompLiteOptions;
    selected: AutocompLiteOptions;
    toggleOption: (option: AutocompLiteOption) => void;
    children?: ReactNode;
    onToggle: () => void;
    showPopover?: boolean;
    showChips?: boolean;
    chipLimit?: number;
    isSticky?: boolean;
}
export interface AutocompLiteOption
    extends Record<string, string | boolean | undefined> {
    id: string;
    full: string;
    // internal fast-search field (lowercased) — not exposed to callers except read-only
    _search?: string;
    disabled?: boolean;
}

export type AutocompLiteOptions = Array<AutocompLiteOption>;

export type UseAutocompleteParams<T extends { id: string }> = {
    places: Array<T>;
    mapper: (place: T) => AutocompLiteOption;
    /** initial value for the controlled input */
    initialQuery?: string;
    initialSelectedIds?: Array<string>;
    /** called whenever selection changes; returns the new selected options and the toggled option */
    onToggle?: (
        selected: AutocompLiteOptions,
        toggled: AutocompLiteOption,
    ) => void;
    /** whether multiple selection is allowed (default: true) */
    multi?: boolean;
    /** predicate that, given a normalized Option, returns true if the option should be disabled (not selectable) */
    disabledPredicate?: (option: AutocompLiteOption) => boolean;
    /** called when user attempts to select a disabled option */
    onAttemptSelectDisabled?: (option: AutocompLiteOption) => void;
    onError?: (message: string) => void;
};

export type UseAutocompleteReturn = {
    options: AutocompLiteOptions;
    filteredOptions: AutocompLiteOptions;
    query: string;
    setQuery: (q: string) => void;
    selected: AutocompLiteOptions;
    toggleOption: (option: AutocompLiteOption) => void;
    selectOption: (option: AutocompLiteOption) => void;
    deselectOption: (option: AutocompLiteOption) => void;
    /** map for O(1) lookup by id */
    lookupById: Record<string, AutocompLiteOption>;
    // groupedByCountry: Record<string, AutocompLiteOptions>;
    clearSelection: () => void;
    liveMessage?: string;
    showPopover: boolean;
    setPopover: Dispatch<SetStateAction<boolean>>;
};

export type AutocompLiteOptionsListProps = {
    // renderOption?: (
    //     option: Option,
    //     meta: { selected: boolean; highlighted: boolean; disabled: boolean },
    // ) => ReactNode;
    idPrefix?: string;
    containerClassName?: string;
    filteredOptions: AutocompLiteOptions;
    selected: AutocompLiteOptions;
    toggleOption: (option: AutocompLiteOption) => void;
    query: string;
};

export interface AutocompLiteOptionProps {
    children: string;
    query: string;
    isHighlighted: boolean;
    isSelected: boolean;
    isDisabled?: boolean;
    id: string;
    optionRefs?: RefObject<Map<number, HTMLDivElement | null>>;
    position: number;
    onSelect: (position: number) => void;
}

export interface SplitMatchProps {
    children: string;
    searchText?: string;
    separator?: string;
    caseSensitive?: boolean;
    global?: boolean;
    includeSeparator?: boolean;
}

export type MatchTuple = [number, number];
export type MatchTuples = Array<MatchTuple>;

export interface ChipsProps {
    selected: AutocompLiteOptions;
    onRemove: (item: AutocompLiteOption) => void;
    limit: number;
}
