import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import {
    findDividersIndexOf,
    findMatchesIndexOf,
    isIndexInMatches,
} from './utils';

describe('findMatchesIndexOf (property tests)', () => {
    it('returns [] for empty needle', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.boolean(),
                fc.boolean(),
                (text, global, caseSensitive) => {
                    expect(
                        findMatchesIndexOf(text, '', global, caseSensitive),
                    ).toEqual([]);
                },
            ),
        );
    });

    it('all returned ranges are in-bounds and have correct length', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string({ minLength: 1 }), // ensure non-empty needle
                fc.boolean(),
                fc.boolean(),
                (text, needle, global, caseSensitive) => {
                    const ranges = findMatchesIndexOf(
                        text,
                        needle,
                        global,
                        caseSensitive,
                    );
                    // computed needle to compare with indexOf behavior (respecting caseSensitivity)
                    const hay = caseSensitive ? text : text.toLowerCase();
                    const need = caseSensitive ? needle : needle.toLowerCase();

                    for (const [s, e] of ranges) {
                        expect(Number.isInteger(s)).toBe(true);
                        expect(Number.isInteger(e)).toBe(true);
                        expect(s).toBeGreaterThanOrEqual(0);
                        expect(e).toBeLessThanOrEqual(text.length);
                        expect(e - s).toBe(need.length);
                        // verify substring actually matches needle (respecting caseSensitivity)
                        expect(hay.slice(s, e)).toBe(need);
                    }
                },
            ),
        );
    });
});

describe('findDividersIndexOf (property tests)', () => {
    it('separator empty -> single divider at text.length', () => {
        fc.assert(
            fc.property(fc.string(), (text) => {
                expect(findDividersIndexOf(text, '')).toEqual([text.length]);
            }),
        );
    });

    it('last element equals text.length and indices strictly increasing', () => {
        fc.assert(
            fc.property(fc.string(), fc.string(), (text, separator) => {
                // separator can be empty in previous test; here we allow any string (including empty)
                const divs = findDividersIndexOf(text, separator);
                expect(divs[divs.length - 1]).toBe(text.length);

                for (let i = 1; i < divs.length; i++) {
                    expect(divs[i]).toBeGreaterThan(divs[i - 1]);
                }

                for (const d of divs) {
                    expect(d).toBeGreaterThanOrEqual(0);
                    expect(d).toBeLessThanOrEqual(text.length);
                }
            }),
        );
    });

    it('each returned slice that corresponds to a found separator ends with the separator (when separator non-empty)', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string({ minLength: 1 }),
                (text, separator) => {
                    const divs = findDividersIndexOf(text, separator);

                    // If no separators were found, divs should be [text.length] and there's nothing to check.
                    if (divs.length <= 1) {
                        expect(divs).toEqual([text.length]);
                        return;
                    }

                    // All entries except the final one correspond to a found separator
                    // (the last entry is always text.length, appended by the function).
                    let prev = 0;
                    for (let i = 0; i < divs.length - 1; i++) {
                        const d = divs[i];
                        // segment that ends at d should end with separator
                        const seg = text.slice(prev, d);
                        expect(seg.endsWith(separator)).toBe(true);
                        prev = d;
                    }

                    // final element must equal text.length
                    expect(divs[divs.length - 1]).toBe(text.length);

                    // basic bounds checks for all returned dividers
                    for (const d of divs) {
                        expect(d).toBeGreaterThanOrEqual(0);
                        expect(d).toBeLessThanOrEqual(text.length);
                    }
                },
            ),
        );
    });
});

describe('isIndexInMatches (property tests)', () => {
    it('isIndexInMatches matches the predicate definition', () => {
        fc.assert(
            fc.property(
                fc.string(),
                fc.string({ minLength: 1 }),
                fc.boolean(),
                fc.boolean(),
                (text, needle, global, caseSensitive) => {
                    const matches = findMatchesIndexOf(
                        text,
                        needle,
                        global,
                        caseSensitive,
                    );
                    // verify for every index in range 0..text.length-1 that isIndexInMatches equals the predicate
                    for (let i = 0; i < text.length; i++) {
                        const expected = matches.some(
                            ([s, e]) => i >= s && i < e,
                        );
                        expect(isIndexInMatches(i, matches)).toBe(expected);
                    }
                },
            ),
        );
    });
});
