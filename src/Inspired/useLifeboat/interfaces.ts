import { type DBSchema } from 'idb';

export interface Lifeboat<
    T = string | number | Array<unknown> | Record<string, any> | null,
> {
    timestamp: number;
    key: string;
    value: T;
    critical?: boolean;
}

export interface LifeboatDB extends DBSchema {
    lifeboats: {
        key: string;
        value: Lifeboat;
        indexes: { 'by-timestamp': number };
    };
}
