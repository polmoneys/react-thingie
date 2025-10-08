import { useCallback, useMemo, useState } from 'react';

import { type FileSystem, type ID } from './interfaces';
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

    return {
        state,
        dispatch,
        tree,
        selectedId,
        setSelectedId,
        expanded,
        toggleExpand,
    };
}
