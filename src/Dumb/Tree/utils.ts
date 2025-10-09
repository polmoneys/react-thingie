import type { FileSystem, ID, RenderNode } from './interfaces';

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
