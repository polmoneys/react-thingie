import fc from 'fast-check';
import { describe, expect, it } from 'vitest';

import { sliceByRanges } from './chunk';

type Range = [number, number];
type Matrix<T> = Array<Array<T>>;

function referenceSliceByRanges<T>(
    arr: readonly T[],
    ranges: Array<[number, number]>,
    allowNegative = false,
): Matrix<T> {
    const n = arr.length;
    const out: Matrix<T> = [];

    for (const r of ranges) {
        const [rawStart, rawEnd] = r;
        if (!Number.isInteger(rawStart) || !Number.isInteger(rawEnd)) {
            out.push([]);
            continue;
        }

        let start = rawStart;
        let end = rawEnd;

        if (allowNegative) {
            if (start < 0) start = n + start;
            if (end < 0) end = n + end;
        }

        // clamp to bounds
        start = Math.max(0, start);
        end = Math.min(n - 1, end);

        if (start > end) {
            out.push([]);
            continue;
        }

        out.push((arr as T[]).slice(start, end + 1));
    }

    return out.filter((g) => g.length > 0);
}

describe('sliceByRanges (property tests)', () => {
    // strings are easy to inspect
    const smallArrayArb = fc.array(fc.string(), { maxLength: 20 });

    // ranges: allow integers and non-integers (fast-check double) so we exercise Number.isInteger branch
    const rangeEndpointArb = fc.oneof(
        fc.integer({ min: -25, max: 25 }),
        fc.double({ min: -25, max: 25 }).filter((d) => !Number.isNaN(d)),
    );

    const rangesArb = fc.array(fc.tuple(rangeEndpointArb, rangeEndpointArb), {
        maxLength: 12,
    });

    it('matches reference implementation for random arrays and ranges (with both allowNegative flags)', () => {
        fc.assert(
            fc.property(
                smallArrayArb,
                rangesArb,
                fc.boolean(),
                (arr, ranges, allowNegative) => {
                    const expected = referenceSliceByRanges(
                        arr,
                        ranges as Array<[number, number]>,
                        allowNegative,
                    );
                    const actual = sliceByRanges(
                        arr,
                        ranges as Array<[number, number]>,
                        allowNegative,
                    );
                    expect(actual).toEqual(expected);
                },
            ),
        );
    });

    it('returned slices are contiguous subsequences of the original array', () => {
        fc.assert(
            fc.property(
                smallArrayArb,
                rangesArb,
                fc.boolean(),
                (arr, ranges, allowNegative) => {
                    const out = sliceByRanges(
                        arr,
                        ranges as Array<[number, number]>,
                        allowNegative,
                    );

                    // every returned slice must appear somewhere in `arr` as a contiguous subarray
                    for (const s of out) {
                        const len = s.length;
                        expect(len).toBeGreaterThan(0);

                        // try to find an index `i` such that arr.slice(i, i+len) equals s
                        let found = false;
                        for (let i = 0; i + len <= arr.length; i++) {
                            let ok = true;
                            for (let j = 0; j < len; j++) {
                                if (arr[i + j] !== s[j]) {
                                    ok = false;
                                    break;
                                }
                            }
                            if (ok) {
                                found = true;
                                break;
                            }
                        }
                        expect(found).toBe(true);
                    }
                },
            ),
        );
    });

    it('negative indexes are interpreted relative to array length when allowNegative = true', () => {
        fc.assert(
            fc.property(
                smallArrayArb,
                fc.integer({ min: -10, max: -1 }),
                fc.integer({ min: -10, max: -1 }),
                (arr, a, b) => {
                    // pick two negative endpoints and ensure allowNegative true
                    const ranges: Range[] = [[a, b]];
                    const expected = referenceSliceByRanges(arr, ranges, true);
                    const actual = sliceByRanges(arr, ranges, true);
                    expect(actual).toEqual(expected);
                },
            ),
        );
    });
});
