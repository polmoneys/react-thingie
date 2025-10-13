import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import type { AutocompLiteOption } from './interfaces';
import { createOptions, filterOptions } from './utils';

const testMapper = (p: { id: string; full: string }): AutocompLiteOption => ({
    id: p.id,
    full: p.full,
});

describe('useAutocompLite utilities', () => {
    it('should pass', () => {
        expect(true).toBe(true);
    });

    const placesArb = fc.array(
        fc.record({
            id: fc.string({ minLength: 1, maxLength: 12 }),
            full: fc.string({ maxLength: 80 }),
        }),
        { maxLength: 12 },
    );

    const whitespaceArb = fc
        .array(fc.constant(' '), { maxLength: 5 })
        .map((arr) => arr.join(''));

    it('empty or whitespace query returns all options (preserves array)', () => {
        fc.assert(
            fc.property(placesArb, whitespaceArb, (places, whitespace) => {
                const options = createOptions(places, testMapper);
                // both empty string and whitespace-only should return the original list
                expect(filterOptions(options, '')).toEqual(options);
                expect(filterOptions(options, whitespace)).toEqual(options);
            }),
        );
    });

    it('case-insensitive: query casing does not change results', () => {
        fc.assert(
            fc.property(
                placesArb,
                fc.string({ maxLength: 40 }),
                (places, rawQuery) => {
                    const options = createOptions(places, testMapper);
                    const a = filterOptions(options, rawQuery);
                    const b = filterOptions(options, rawQuery.toUpperCase());
                    const c = filterOptions(options, rawQuery.toLowerCase());
                    expect(a).toEqual(b);
                    expect(a).toEqual(c);
                },
            ),
        );
    });

    it('token-AND behaviour: returned options contain all tokens; excluded options miss at least one token', () => {
        fc.assert(
            fc.property(
                placesArb,
                fc.string({ minLength: 1, maxLength: 40 }),
                (places, rawQuery) => {
                    const options = createOptions(places, testMapper);
                    const res = filterOptions(options, rawQuery);

                    const q = (rawQuery || '').trim().toLowerCase();
                    const tokens = q.split(/\s+/).filter(Boolean);

                    if (tokens.length === 0) {
                        expect(res).toEqual(options);
                        return;
                    }

                    for (const o of res) {
                        for (const t of tokens) {
                            if (!((o._search || '') as string).includes(t)) {
                                throw new Error(
                                    `Returned option ${o.id} missing token "${t}" for query "${rawQuery}"`,
                                );
                            }
                        }
                    }

                    // every option not returned must be missing at least one token
                    for (const o of options) {
                        if (!res.includes(o)) {
                            const hasAll = tokens.every((t) =>
                                ((o._search || '') as string).includes(t),
                            );
                            if (hasAll) {
                                throw new Error(
                                    `Option ${o.id} has all tokens but was not returned (query="${rawQuery}")`,
                                );
                            }
                        }
                    }
                },
            ),
            { numRuns: 300 },
        );
    });

    it('stable ordering: filtered result is a subsequence of original options', () => {
        fc.assert(
            fc.property(
                placesArb,
                fc.string({ maxLength: 40 }),
                (places, rawQuery) => {
                    const options = createOptions(places, testMapper);
                    const res = filterOptions(options, rawQuery);

                    // indices in original options must be strictly increasing
                    let lastIndex = -1;
                    for (const r of res) {
                        const idx = options.indexOf(r);
                        // must exist
                        expect(idx).toBeGreaterThan(-1);
                        expect(idx).toBeGreaterThan(lastIndex);
                        lastIndex = idx;
                    }
                },
            ),
        );
    });

    it('filterOptions does not mutate the input options array or objects', () => {
        fc.assert(
            fc.property(
                placesArb,
                fc.string({ maxLength: 40 }),
                (places, q) => {
                    const options = createOptions(places, testMapper);

                    // deep clone for comparison
                    const before = JSON.parse(
                        JSON.stringify(options),
                    ) as AutocompLiteOption[];

                    // run the filter
                    void filterOptions(options, q);

                    // deep equality
                    const after = JSON.parse(
                        JSON.stringify(options),
                    ) as AutocompLiteOption[];
                    expect(after).toEqual(before);
                },
            ),
        );
    });
});
