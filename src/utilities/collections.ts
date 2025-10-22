/*
  🆒

   const results = data?.pages.flatMap((ob) => ob?.items ?? []) ?? [];

   const byAge = users.toSorted((a, b) => a.age - b.age);

   const opts = [a,b,c]
   const optsChanged = !opts.every( (item, i) => prevOpts.current[i] === item)

*/

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

// const grouped = Object.groupBy(tasks, task => task.status);
// const lastUnread = messages.findLast(msg => !msg.read);

export function splitArray<T>(items: T[], fn: (el: T) => boolean): [T[], T[]] {
    const match = [] as T[];
    const dispose = [] as T[];
    for (const el of items) {
        if (fn(el)) {
            match.push(el);
        } else {
            dispose.push(el);
        }
    }
    return [match, dispose];
}

export const nest = (
    items: Array<Record<string, any>>,
    id: number | null = null,
    link = 'parent_id',
): Array<Record<string, any>> =>
    items
        .filter((item) => item[link] === id)
        .map((item) => ({ ...item, children: nest(items, item.id, link) }));
