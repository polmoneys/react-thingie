import { getDB, MAX_LIFEBOATS, STORE_NAME } from './db';
import type { Lifeboat } from './interfaces';

export async function getAllLifeboats(): Promise<Lifeboat[]> {
    const db = await getDB();
    return db.getAll(STORE_NAME);
}

export async function getLifeboatByKey(
    key: string,
): Promise<Lifeboat | undefined> {
    const db = await getDB();
    return db.get(STORE_NAME, key);
}

export async function createLifeboat<
    T extends string | number | Array<unknown> | null,
>(key: string, value: T, critical = false): Promise<Lifeboat<T>> {
    const db = await getDB();
    // Check if we need to remove old lifeboats
    const allLifeboats = await getAllLifeboats();
    if (allLifeboats.length >= MAX_LIFEBOATS) {
        // Remove oldest non-critical lifeboat
        const nonCritical = allLifeboats
            .filter((lb) => !lb.critical)
            .sort((a, b) => a.timestamp - b.timestamp);
        if (nonCritical.length > 0) {
            await db.delete(STORE_NAME, nonCritical[0].key);
        }
    }
    const lifeboat: Lifeboat<T> = {
        timestamp: Date.now(),
        key,
        value,
        critical,
    };
    await db.put(STORE_NAME, lifeboat);
    return lifeboat;
}

export async function updateLifeboat<
    T extends string | number | Array<unknown> | null,
>(key: string, value: T): Promise<Lifeboat<T>> {
    const db = await getDB();
    const existing = await getLifeboatByKey(key);
    const lifeboat: Lifeboat<T> = {
        timestamp: Date.now(),
        key,
        value,
        critical: existing?.critical ?? false,
    };
    await db.put(STORE_NAME, lifeboat);
    return lifeboat;
}

export async function deleteLifeboat(key: string): Promise<void> {
    const db = await getDB();
    await db.delete(STORE_NAME, key);
}

export async function deleteAllLifeboats(): Promise<void> {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    await tx.store.clear();
    await tx.done;
}
