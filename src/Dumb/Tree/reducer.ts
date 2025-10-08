import type { Action, FileNode, FileSystem } from './interfaces';
import { collectDescendants, getMaxId, isDescendant } from './utils';

export const initialFileSystem: FileSystem = {
    0: {
        id: 0,
        title: 'Macintosh HD',
        type: 'folder',
        childIds: [1, 2, 8],
        parentId: null,
    },
    1: {
        id: 1,
        title: 'Applications',
        type: 'folder',
        childIds: [3, 4],
        parentId: 0,
    },
    2: { id: 2, title: 'Users', type: 'folder', childIds: [5, 6], parentId: 0 },
    3: {
        id: 3,
        title: 'Visual Studio Code.app',
        type: 'file',
        childIds: [],
        parentId: 1,
    },
    4: { id: 4, title: 'iTerm.app', type: 'file', childIds: [], parentId: 1 },
    5: { id: 5, title: 'alice', type: 'folder', childIds: [7], parentId: 2 },
    6: {
        id: 6,
        title: 'shared',
        type: 'folder',
        childIds: [],
        parentId: 2,
        disabled: true,
    },
    7: { id: 7, title: 'todo.txt', type: 'file', childIds: [], parentId: 5 },
    8: { id: 8, title: 'Library', type: 'folder', childIds: [], parentId: 0 },
};

export default function fsReducer(
    state: FileSystem,
    action: Action,
): FileSystem {
    switch (action.type) {
        case 'ADD': {
            const maxId = getMaxId(state);
            const newId = maxId + 1;
            const newNode: FileNode = {
                id: newId,
                title: action.title,
                type: action.nodeType,
                childIds: [],
                parentId: action.parentId,
            };
            const parent = state[action.parentId];
            if (!parent || parent.type !== 'folder' || parent.disabled)
                return state;
            return {
                ...state,
                [newId]: newNode,
                [action.parentId]: {
                    ...parent,
                    childIds: [...parent.childIds, newId],
                },
            };
        }

        case 'REMOVE_SUBTREE': {
            if (state[action.id]?.disabled) return state;
            const toDelete = collectDescendants(state, action.id);
            const next = { ...state };
            for (const id of toDelete) delete next[id];
            const parentId = state[action.id]?.parentId ?? null;
            if (parentId != null && next[parentId]) {
                next[parentId] = {
                    ...next[parentId],
                    childIds: next[parentId].childIds.filter(
                        (id) => id !== action.id,
                    ),
                };
            }
            return next;
        }

        case 'MOVE': {
            const { id, toParentId } = action;
            if (id === toParentId) return state;
            const node = state[id];
            const newParent = state[toParentId];
            if (
                !node ||
                node.disabled ||
                !newParent ||
                newParent.type !== 'folder'
            )
                return state;
            if (isDescendant(state, id, toParentId)) return state;

            const oldParentId = node.parentId ?? null;
            const next = { ...state };
            if (oldParentId != null && next[oldParentId]) {
                next[oldParentId] = {
                    ...next[oldParentId],
                    childIds: next[oldParentId].childIds.filter(
                        (cid) => cid !== id,
                    ),
                };
            }
            next[toParentId] = {
                ...next[toParentId],
                childIds: [...next[toParentId].childIds, id],
            };
            next[id] = { ...next[id], parentId: toParentId };
            return next;
        }

        case 'RENAME': {
            const node = state[action.id];
            if (!node || node.disabled) return state;
            return { ...state, [action.id]: { ...node, title: action.title } };
        }

        default:
            return state;
    }
}
