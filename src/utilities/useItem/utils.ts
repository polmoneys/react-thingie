export const clone = <T>(v: T): T => {
    if (typeof structuredClone === 'function') return structuredClone(v);
    return v;
};

export const cloneFallback = <T>(v: T): T => {
    if (typeof structuredClone === 'function') return structuredClone(v);
    return JSON.parse(JSON.stringify(v)); // loses Date, Map, Set, circular refs
};

export const deepEqual = (a: any, b: any): boolean => {
    if (a === b) return true;

    if (a instanceof Date && b instanceof Date)
        return a.getTime() === b.getTime();
    if (a instanceof Date || b instanceof Date) return false;

    if (
        typeof a !== 'object' ||
        typeof b !== 'object' ||
        a == null ||
        b == null
    )
        return a === b;

    if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b)) return false;
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++)
            if (!deepEqual(a[i], b[i])) return false;
        return true;
    }

    const ka = Object.keys(a);
    const kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) {
        if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
        if (!deepEqual(a[k], b[k])) return false;
    }
    return true;
};
