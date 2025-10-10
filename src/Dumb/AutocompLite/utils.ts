import type { MatchTuples } from './interfaces';

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
