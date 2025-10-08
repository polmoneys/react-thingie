export type ID = number;
export type NodeType = 'file' | 'folder';

export interface FileNode {
    id: ID;
    title: string;
    type: NodeType;
    childIds: Array<ID>;
    parentId?: ID | null;
    disabled?: boolean;
}

export type FileSystem = Record<ID, FileNode>;

export interface RenderNode {
    id: ID;
    title: string;
    type: NodeType;
    children: Array<RenderNode>;
    disabled?: boolean;
}

export type Action =
    | { type: 'ADD'; parentId: ID; title: string; nodeType: NodeType }
    | { type: 'REMOVE_SUBTREE'; id: ID }
    | { type: 'MOVE'; id: ID; toParentId: ID }
    | { type: 'RENAME'; id: ID; title: string };
