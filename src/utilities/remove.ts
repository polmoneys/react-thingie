/*
interface Share {
  isin: string;
  name: string;
}

const uniqueShares = removeDuplicatesBy(shares, share => share.isin);

*/

export function removeDuplicatesBy<T, K>(
    input: T[],
    keySelector: (item: T) => K,
): T[] {
    const seen = new Set<K>();
    return input.filter((item) => {
        const key = keySelector(item);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}

// const opts = [a,b,c]
// const optsChanged = !opts.every( (item, i) => prevOpts.current[i] === item)
