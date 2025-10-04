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
