import type { RecursiveItem } from './interfaces';

/** Return the node with matching id (reference to original). */
export function findNodeById<T>(
    items: RecursiveItem<T>[] | undefined,
    id: string | number,
): RecursiveItem<T> | undefined {
    if (!items) return undefined;
    for (const item of items) {
        if (item.id === id) return item;
        if (item.children) {
            const found = findNodeById(item.children, id);
            if (found) return found;
        }
    }
    return undefined;
}

/** Return the node and its parent (parent === null when node is root), or undefined if not found. */
export function findNodeWithParent<T>(
    items: RecursiveItem<T>[] | undefined,
    id: string | number,
    parent: RecursiveItem<T> | null = null,
): { node: RecursiveItem<T>; parent: RecursiveItem<T> | null } | undefined {
    if (!items) return undefined;
    for (const item of items) {
        if (item.id === id) return { node: item, parent };
        if (item.children) {
            const found = findNodeWithParent(item.children, id, item);
            if (found) return found;
        }
    }
    return undefined;
}

/** Return the path (array of nodes) from root to the node, or null if not found. */
export function findPathById<T>(
    items: RecursiveItem<T>[] | undefined,
    id: string | number,
): RecursiveItem<T>[] | null {
    if (!items) return null;
    for (const item of items) {
        if (item.id === id) return [item];
        if (item.children) {
            const childPath = findPathById(item.children, id);
            if (childPath) return [item, ...childPath];
        }
    }
    return null;
}

/** Given a Set of selected ids, return the first node found that is selected (or undefined). */
export function findAnySelected<T>(
    items: RecursiveItem<T>[] | undefined,
    selectedIds: Set<string | number>,
): RecursiveItem<T> | undefined {
    if (!items) return undefined;
    for (const item of items) {
        if (selectedIds.has(item.id)) return item;
        if (item.children) {
            const found = findAnySelected(item.children, selectedIds);
            if (found) return found;
        }
    }
    return undefined;
}
