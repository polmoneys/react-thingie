import { type IDBPDatabase, openDB } from 'idb';

import type { LifeboatDB } from './interfaces';

export const DB_NAME = 'lifeboats-db';
export const STORE_NAME = 'lifeboats';
export const MAX_LIFEBOATS = 24;

let dbInstance: IDBPDatabase<LifeboatDB> | null = null;

export async function getDB(): Promise<IDBPDatabase<LifeboatDB>> {
    if (dbInstance) return dbInstance;

    dbInstance = await openDB<LifeboatDB>(DB_NAME, 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                const store = db.createObjectStore(STORE_NAME, {
                    keyPath: 'key',
                });
                store.createIndex('by-timestamp', 'timestamp');
            }
        },
    });

    return dbInstance;
}
