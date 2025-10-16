export type Mapper<T, D> = {
    toDraft?: (t: T) => D;
    fromDraft?: (d: D) => T;
};

export type Opts<T, D> = {
    mapper?: Mapper<T, D>;
    historyLimit?: number;
    enableHistory?: boolean;
    valueDedup?: boolean;
};
