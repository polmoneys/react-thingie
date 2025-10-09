import { type Dispatch, type SetStateAction } from 'react';

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

export type RenderNodes = Array<RenderNode>;

export interface TreeProps {
    node: RenderNode;
    toggleExpand: (id: ID) => void;
    expanded: Record<number, boolean>;
    setSelectedId: Dispatch<SetStateAction<number>>;
    depth?: number;
    selectedId: ID;
}
