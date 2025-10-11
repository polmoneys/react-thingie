import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { extractPowerWords } from './powerWords';

function referenceExtract(
    query: string,
    powerWords: string[],
    bannedWords: string[],
): [string[], string[]] {
    const processedQuery = query
        .toLowerCase()
        .replace(/[^\w\s'’-]/gi, '')
        .replace(/\s{2,}/g, ' ')
        .trim();

    if (processedQuery === '') return [[], []];

    const words = [...new Set(processedQuery.split(' '))];
    const powerWordsSet = new Set(powerWords.map((w) => w.toLowerCase()));
    const bannedWordsSet = new Set(bannedWords.map((w) => w.toLowerCase()));

    const matches: string[] = [];
    const processedWords: string[] = [];

    for (const raw of words) {
        const word = raw.replace(/[,]/gi, '');
        const lower = word.toLowerCase();

        if (powerWordsSet.has(lower) && !bannedWordsSet.has(lower)) {
            matches.push(word);
        } else if (!powerWordsSet.has(lower) && !bannedWordsSet.has(lower)) {
            processedWords.push(word);
        }
    }

    return [matches, processedWords];
}

describe('extractPowerWords (property tests)', () => {
    // generate query strings (including punctuation and whitespace)
    const queryArb = fc.string({ maxLength: 200 });

    // power/banned word lists: simple non-empty tokens (no spaces) to avoid splitting ambiguity
    const tokenArb = fc
        .string({ minLength: 1, maxLength: 12 })
        .filter((s) => !/\s/.test(s));
    const powerWordsArb = fc.array(tokenArb, { maxLength: 12 });
    const bannedWordsArb = fc.array(tokenArb, { maxLength: 12 });

    it('matches reference implementation for random inputs', () => {
        fc.assert(
            fc.property(
                queryArb,
                powerWordsArb,
                bannedWordsArb,
                (q, pw, bw) => {
                    const expected = referenceExtract(q, pw, bw);
                    const actual = extractPowerWords(q, pw, bw);
                    expect(actual).toEqual(expected);
                },
            ),
        );
    });

    it('is case-insensitive with respect to matching power/banned words', () => {
        fc.assert(
            fc.property(
                queryArb,
                powerWordsArb,
                bannedWordsArb,
                (q, pw, bw) => {
                    const upcaseQ = q.toUpperCase();
                    const a = extractPowerWords(q, pw, bw);
                    const b = extractPowerWords(upcaseQ, pw, bw);
                    expect(a).toEqual(b);
                },
            ),
        );
    });

    it('never returns banned words and never places a word in both outputs', () => {
        fc.assert(
            fc.property(
                queryArb,
                powerWordsArb,
                bannedWordsArb,
                (q, pw, bw) => {
                    const [matches, processed] = extractPowerWords(q, pw, bw);
                    const bannedSet = new Set(bw.map((w) => w.toLowerCase()));
                    for (const m of matches)
                        expect(bannedSet.has(m.toLowerCase())).toBe(false);
                    for (const p of processed)
                        expect(bannedSet.has(p.toLowerCase())).toBe(false);

                    for (const m of matches) {
                        expect(
                            processed
                                .map((x) => x.toLowerCase())
                                .includes(m.toLowerCase()),
                        ).toBe(false);
                    }
                },
            ),
        );
    });

    it('removes duplicates and preserves first-occurrence order of normalized words', () => {
        fc.assert(
            fc.property(
                queryArb,
                powerWordsArb,
                bannedWordsArb,
                (q, pw, bw) => {
                    const [matches, processed] = extractPowerWords(q, pw, bw);

                    // Build the normalized unique word list as the function does
                    const processedQuery = q
                        .toLowerCase()
                        .replace(/[^\w\s'’-]/gi, '')
                        .replace(/\s{2,}/g, ' ')
                        .trim();
                    if (processedQuery === '') {
                        expect(matches).toEqual([]);
                        expect(processed).toEqual([]);
                        return;
                    }

                    const uniqueWords = [
                        ...new Set(processedQuery.split(' ')),
                    ].map((w) => w.replace(/[,]/gi, ''));
                    // const pwSet = new Set(pw.map((x) => x.toLowerCase()));
                    const bwSet = new Set(bw.map((x) => x.toLowerCase()));

                    // expected sequence (first-occurrence order) after removing banned
                    const expectedSeq = uniqueWords.filter(
                        (w) => !bwSet.has(w.toLowerCase()),
                    );

                    // reconstruct combined actual sequence
                    const actualSeq = [...matches, ...processed].map((w) =>
                        w.toLowerCase(),
                    );

                    expect(actualSeq).toEqual(
                        expectedSeq.map((w) => w.toLowerCase()),
                    );
                },
            ),
        );
    });

    it('returns empty arrays for empty or whitespace-only queries', () => {
        expect(extractPowerWords('', ['a'], ['b'])).toEqual([[], []]);
        expect(extractPowerWords('    ', ['a'], ['b'])).toEqual([[], []]);
    });

    // A few small unit tests for punctuation handling to document expected behavior
    it('handles punctuation and commas as expected (examples)', () => {
        expect(extractPowerWords('Hello, world!', ['hello'], [])).toEqual([
            ['hello'],
            ['world'],
        ]);

        // banned overrides power
        expect(extractPowerWords('Hello hello', ['hello'], ['hello'])).toEqual([
            [],
            [],
        ]);
        // apostrophes and dashes preserved by preprocessing
        expect(
            extractPowerWords("rock'n'roll e-mail", ["rock'n'roll"], []),
        ).toEqual([["rock'n'roll"], ['e-mail']]);
    });
});
