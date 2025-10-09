import { useCallback, useMemo, useState } from 'react';

import {
    type FileSystem,
    type ID,
    type RenderNode,
    type RenderNodes,
} from './interfaces';
import { buildTree } from './utils';

export default function useTree(initialTree: FileSystem) {
    const [state, dispatch] = useState(initialTree);

    const [selectedId, setSelectedId] = useState<ID>(0);
    const [expanded, setExpanded] = useState<Record<ID, boolean>>({ 0: true });

    const tree = useMemo(() => buildTree(state, 0), [state]);

    const toggleExpand = useCallback(
        (id: ID) => setExpanded((prev) => ({ ...prev, [id]: !prev[id] })),
        [],
    );

    const findNodeById = useCallback(
        (root: RenderNode | null | undefined, id: ID): RenderNode | null => {
            if (!root) return null;
            if (root.id === id) return root;
            for (const child of root.children) {
                const hit = findNodeById(child, id);
                if (hit) return hit;
            }
            return null;
        },
        [],
    );

    const {
        filesUnderSelected,
        fileIdsUnderSelected,
        foldersUnderSelected,
        flatFilesByFolder,
        flatFileIdsByFolder,
    } = useMemo(() => {
        const target = findNodeById(tree, selectedId);
        if (!target) {
            return {
                filesUnderSelected: [] as RenderNodes,
                fileIdsUnderSelected: [] as ID[],
                foldersUnderSelected: [] as RenderNodes,
                flatFilesByFolder: {} as Record<ID, RenderNodes>,
                flatFileIdsByFolder: {} as Record<ID, ID[]>,
            };
        }

        const files: RenderNodes = [];
        const folders: RenderNodes = [];
        const filesByFolder: Record<ID, RenderNodes> = {};

        // traverse with currentFolderId representing the nearest folder containing the visited node
        const traverse = (node: RenderNode, currentFolderId: ID | null) => {
            if (node.disabled) return;

            if (node.type === 'folder') {
                // don't include the selected root itself in foldersUnderSelected — only descendants
                if (node.id !== target.id) folders.push(node);

                for (const child of node.children) {
                    // for children of a folder, the current folder id becomes this folder's id
                    traverse(child, node.id);
                }
            } else {
                // file
                files.push(node);
                if (currentFolderId != null) {
                    filesByFolder[currentFolderId] =
                        filesByFolder[currentFolderId] ?? [];
                    filesByFolder[currentFolderId].push(node);
                }
                // if currentFolderId is null (selected node is a file), we do not group it under any folder
            }
        };

        // start traversal from the selected node:
        // - if selected node is a folder, group its descendants under that folder (and nested folders)
        // - if selected node is a file, we still traverse (itself) and collect it as a file but there will be no groups
        traverse(target, target.type === 'folder' ? target.id : null);

        const fileIds = files.map((f) => f.id);
        const filesByFolderIds: Record<ID, ID[]> = {};
        for (const k of Object.keys(filesByFolder)) {
            const idKey = Number(k) as ID;
            filesByFolderIds[idKey] = filesByFolder[idKey].map((n) => n.id);
        }

        return {
            filesUnderSelected: files,
            fileIdsUnderSelected: fileIds,
            foldersUnderSelected: folders,
            flatFilesByFolder: filesByFolder,
            flatFileIdsByFolder: filesByFolderIds,
        };
    }, [findNodeById, tree, selectedId]);

    return {
        state,
        dispatch,
        tree,
        selectedId,
        setSelectedId,
        expanded,
        toggleExpand,
        // (non-disabled files in selected subtree)
        filesUnderSelected,
        fileIdsUnderSelected,
        // (non-disabled folders in selected subtree, excludes the selected root itself)
        foldersUnderSelected,
        // Record<folderId, > grouped by immediate containing folder id
        flatFilesByFolder,
        flatFileIdsByFolder,
    };
}
