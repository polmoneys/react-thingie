import type { FileSystem, ID, RenderNode } from './interfaces';

export function getMaxId(fs: FileSystem) {
    return Math.max(...Object.keys(fs).map(Number));
}

export function collectDescendants(fs: FileSystem, startId: ID) {
    const stack = [startId];
    const out: Array<ID> = [];
    while (stack.length) {
        const id = stack.pop()!;
        if (!fs[id]) continue;
        out.push(id);
        for (const c of fs[id].childIds) stack.push(c);
    }
    return out;
}

export function buildTree(fs: FileSystem, rootId: ID): RenderNode {
    const node = fs[rootId];
    if (!node)
        return { id: rootId, title: '(missing)', type: 'folder', children: [] };
    return {
        id: node.id,
        title: node.title,
        type: node.type,
        children: node.childIds.map((cid) => buildTree(fs, cid)),
        disabled: node.disabled ?? false,
    };
}

// Compute depth (0 = root) by walking parentId up to root
export function getDepth(fs: FileSystem, id: ID): number {
    let depth = 0;
    let cur = fs[id];
    while (cur && cur.parentId != null) {
        depth++;
        cur = fs[cur.parentId!];
    }
    return depth;
}

export function isDescendant(
    fs: FileSystem,
    ancestorId: ID,
    possibleDescendantId: ID,
) {
    const stack = [...fs[ancestorId].childIds];
    while (stack.length) {
        const id = stack.pop()!;
        if (id === possibleDescendantId) return true;
        for (const c of fs[id].childIds) stack.push(c);
    }
    return false;
}
