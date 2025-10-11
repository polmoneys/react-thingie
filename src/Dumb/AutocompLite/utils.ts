import type {
    AutocompLiteOption,
    AutocompLiteOptions,
    MatchTuples,
} from './interfaces';

export function normalizeForSearch(input: string | undefined | null): string {
    const s = (input || '').toLowerCase();
    // Normalize and remove diacritics (requires Unicode property support)
    // Fallback to a simple toLowerCase() if environment doesn't support \p{Diacritic}
    try {
        return s
            .normalize('NFKD')
            .replace(/\p{Diacritic}/gu, '')
            .replace(/\s+/g, ' ') // collapse whitespace
            .trim();
    } catch (e) {
        return s.replace(/\s+/g, ' ').trim();
    }
}

export function createOptions<T extends { id: string }>(
    places: T[],
    mapper: (p: T) => AutocompLiteOption,
    disabledPredicate?: (option: AutocompLiteOption) => boolean,
): AutocompLiteOptions {
    return places.map((p) => {
        const raw = mapper(p) || ({} as AutocompLiteOption);

        // copy fields into a new object to avoid mutating the caller's object
        const copied: AutocompLiteOption = {
            ...raw,
            id: raw.id,
            full: raw.full || '',
        };

        // computed search string (normalized)
        copied._search = normalizeForSearch(copied.full);

        // resolve disabled flag: disabledPredicate takes precedence if provided
        if (typeof disabledPredicate === 'function') {
            copied.disabled = Boolean(disabledPredicate(copied));
        } else if (typeof raw.disabled !== 'undefined') {
            copied.disabled = raw.disabled;
        }

        return copied;
    });
}

export function filterOptions(
    options: AutocompLiteOptions,
    query: string | undefined | null,
): AutocompLiteOptions {
    const q = (query || '').trim().toLowerCase();
    if (q === '') return options;

    const tokens = q.split(/\s+/).filter(Boolean);
    if (tokens.length === 0) return options;

    return options.filter((o) => {
        const hay = (o._search || normalizeForSearch(o.full || '')) as string;
        for (const t of tokens) {
            if (!hay.includes(t)) return false;
        }
        return true;
    });
}

export function buildLookupById(
    options: AutocompLiteOptions,
): Record<string, AutocompLiteOption> {
    const map: Record<string, AutocompLiteOption> = {};
    for (const o of options) map[o.id] = o;
    return map;
}

export function findMatchesIndexOf(
    text: string,
    needle: string,
    global: boolean,
    caseSensitive: boolean,
): MatchTuples {
    if (!needle) return [];
    const hay = caseSensitive ? text : text.toLowerCase();
    const need = caseSensitive ? needle : needle.toLowerCase();
    const ranges: MatchTuples = [];
    let pos = 0;
    while (pos <= hay.length - need.length) {
        const idx = hay.indexOf(need, pos);
        if (idx === -1) break;
        ranges.push([idx, idx + need.length]);
        if (!global) break;
        pos = idx + 1; // advance by 1 to allow overlapping matches (if desired)
    }
    return ranges;
}

export function findDividersIndexOf(text: string, separator: string): number[] {
    if (!separator) return [text.length];
    const divs: number[] = [];
    let pos = 0;
    while (pos < text.length) {
        const idx = text.indexOf(separator, pos);
        if (idx === -1) break;
        divs.push(idx + separator.length);
        pos = idx + separator.length;
    }
    return [...divs, text.length];
}

export function isIndexInMatches(index: number, matches: MatchTuples) {
    return matches.some((m) => index >= m[0] && index < m[1]);
}
