export type Range = [number, number];

export function sliceByRanges<T>(
    arr: readonly T[],
    ranges: Range[],
    allowNegative: boolean = false,
): T[][] {
    const n = arr.length;
    const out: T[][] = [];

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

        out.push(arr.slice(start, end + 1));
    }

    return out.filter((g) => g.length > 0);
}
