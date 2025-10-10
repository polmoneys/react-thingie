import { useCallback, useEffect, useMemo, useState } from 'react';

import type {
    AutocompLiteOption,
    UseAutocompleteParams,
    UseAutocompleteReturn,
} from './interfaces';

export default function useAutocompleteDestination<T extends { id: string }>(
    params: UseAutocompleteParams<T>,
): UseAutocompleteReturn {
    const {
        places,
        mapper,
        initialQuery = '',
        initialSelectedIds = [],
        onToggle,
        multi = true,
        disabledPredicate,
        onAttemptSelectDisabled,
        onError,
    } = params;

    const options = useMemo(() => {
        const out: AutocompLiteOption[] = new Array(places.length);

        for (let i = 0; i < places.length; i++) {
            const p = places[i];
            const option = mapper(p);

            if (!option || !option.id) {
                onError?.("mapper must return an Option with an 'id' field");
            }

            // add a lowercased concatenation for fast searching
            (option as any)._search = option.full.toLowerCase();

            // if a disabledPredicate is provided, let it decide.
            // Otherwise preserve any disabled flag from mapper.
            if (typeof disabledPredicate === 'function') {
                option.disabled = Boolean(disabledPredicate(option));
            }
            out[i] = option;
        }

        return out;
    }, [places, mapper, disabledPredicate, onError]);

    const lookupById = useMemo(() => {
        const map: Record<string, AutocompLiteOption> = {};
        for (const o of options) map[o.id] = o;
        return map;
    }, [options]);

    const [query, setQuery] = useState(initialQuery);

    const [selectedIds, setSelectedIds] = useState<string[]>(() => {
        // only keep ids that exist in lookup and are not disabled — defensive initialization
        return initialSelectedIds.filter(
            (id) => lookupById[id] && !lookupById[id].disabled,
        );
    });

    const selected = useMemo(
        () => selectedIds.map((id) => lookupById[id]).filter(Boolean),
        [selectedIds, lookupById],
    );

    // filtering logic: tokenized AND-match across city/state/country/continent/full
    const filteredOptions = useMemo(() => {
        const q = (query || '').trim().toLowerCase();
        if (q === '') return options;

        const tokens = q.split(/\s+/).filter(Boolean);
        if (tokens.length === 0) return options;

        // For speed we use precomputed _search
        return options.filter((o) => {
            const hay = (o._search || '') as string;
            // require all tokens to be present
            for (const t of tokens) {
                if (!hay.includes(t)) return false;
            }
            return true;
        });
    }, [options, query]);

    const clearSelection = useCallback(() => setSelectedIds([]), []);

    const selectOption = useCallback(
        (option: AutocompLiteOption) => {
            if (option.disabled) {
                if (onAttemptSelectDisabled) onAttemptSelectDisabled(option);
                return;
            }

            setSelectedIds((prev) => {
                // single-select case
                if (!multi) {
                    const next = [option.id];
                    if (onToggle)
                        onToggle(
                            next.map((id) => lookupById[id]),
                            option,
                        );
                    return next;
                }
                if (prev.includes(option.id)) return prev;
                const next = [...prev, option.id];
                if (onToggle)
                    onToggle(
                        next.map((id) => lookupById[id]),
                        option,
                    );
                return next;
            });
        },
        [onAttemptSelectDisabled, multi, onToggle, lookupById],
    );

    const deselectOption = useCallback(
        (option: AutocompLiteOption) => {
            setSelectedIds((prev) => {
                if (!prev.includes(option.id)) return prev;
                const next = prev.filter((id) => id !== option.id);
                if (onToggle)
                    onToggle(
                        next.map((id) => lookupById[id]),
                        option,
                    );
                return next;
            });
        },
        [onToggle, lookupById],
    );

    const toggleOption = useCallback(
        (option: AutocompLiteOption) => {
            setSelectedIds((prev) => {
                const exists = prev.includes(option.id);
                if (option.disabled && !exists) {
                    if (onAttemptSelectDisabled)
                        onAttemptSelectDisabled(option);
                    return prev;
                }
                let next: string[];
                if (multi) {
                    next = exists
                        ? prev.filter((id) => id !== option.id)
                        : [...prev, option.id];
                } else {
                    next = exists ? [] : [option.id];
                }
                if (onToggle)
                    onToggle(
                        next.map((id) => lookupById[id]),
                        option,
                    );
                return next;
            });
        },
        [multi, onToggle, onAttemptSelectDisabled, lookupById],
    );

    const [showPopover, setPopover] = useState(true);

    const [liveMessage, setLiveMessage] = useState<string>('');
    useEffect(() => {
        const count = filteredOptions.length;
        // you can expand message to include selected count if desired
        setLiveMessage(
            count === 0
                ? 'No results'
                : `${count} result${count === 1 ? '' : 's'} available`,
        );
    }, [filteredOptions.length]);

    return {
        options,
        filteredOptions,
        query,
        setQuery,
        selected,
        toggleOption,
        selectOption,
        deselectOption,
        lookupById,
        clearSelection,
        showPopover,
        setPopover,
        liveMessage,
    };
}
