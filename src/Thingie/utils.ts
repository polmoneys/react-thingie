import type { Key } from './interfaces';

export function getKeyFrom<T>(value: T | Key, keyOf: (t: T) => Key): Key {
    if (
        typeof value === 'string' ||
        typeof value === 'number' ||
        typeof value === 'symbol'
    ) {
        return value as Key;
    }
    return keyOf(value as T);
}
