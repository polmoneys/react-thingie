export const clone = <T>(v: T): T => {
    if (typeof structuredClone === 'function') return structuredClone(v);
    return v;
};
