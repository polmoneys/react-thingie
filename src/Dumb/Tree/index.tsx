import { useState } from 'react';

import { useFocus } from 'react-aria';

import { clsx } from '../../utils';
import Button from '../Button';
import Font from '../Font';
import Group from '../Group';
import Icon from '../Icon';
import Shape from '../Shape';

import { type NodeType, type TreeProps } from './interfaces';

import styles from './index.module.css';

const INDENT_PX = 22;

export const FileOrFolder = ({ type }: { type: NodeType }) => {
    return type === 'folder' ? (
        <Shape.Square size={20} />
    ) : (
        <Shape sides={5} size={20} />
    );
};

export default function RecursiveItem(props: TreeProps) {
    const {
        node,
        depth = 0,
        setSelectedId,
        toggleExpand,
        expanded,
        selectedId,
    } = props;

    const [isFocused, setFocus] = useState(false);
    const { focusProps } = useFocus({
        onFocus: () => setFocus(true),
        onBlur: () => setFocus(false),
        // onFocusChange: (isFocused) =>
    });

    // const original = state[node.id];
    const isFolder = node.type === 'folder';
    const isExpanded = Boolean(expanded[node.id]);
    const isSelected = selectedId === node.id;

    const groupId = `tree-group-${node.id}`;
    const treeItemId = `treeitem-${node.id}`;

    return (
        <li className={styles.li} data-depth={depth}>
            <div
                id={treeItemId}
                role="treeitem"
                aria-level={depth}
                aria-selected={isSelected ?? undefined}
                aria-expanded={isFolder ? isExpanded : undefined}
                aria-disabled={node.disabled ?? undefined}
                className={clsx(styles.row, node.disabled && styles.disabled)}
                style={{ paddingLeft: depth * INDENT_PX }}
            >
                {isFolder ? (
                    <Button.Transparent
                        isIcon
                        onClick={(event) => {
                            event.stopPropagation();
                            toggleExpand(node.id);
                        }}
                        disabled={node.disabled}
                        aria-label={
                            isExpanded
                                ? `Collapse ${node.title}`
                                : `Expand ${node.title}`
                        }
                        aria-expanded={isExpanded}
                        aria-controls={groupId}
                        {...focusProps}
                    >
                        {expanded[node.id] ? (
                            <Icon.ChevronDown circle={false} size={48} />
                        ) : (
                            <Icon.Chevron circle={false} size={48} />
                        )}
                    </Button.Transparent>
                ) : null}

                <button
                    onClick={() => {
                        if (node.disabled) return;
                        setSelectedId(node.id);
                    }}
                >
                    <Group.Row
                        alignItems="center"
                        dangerous={{
                            backgroundColor: isFocused
                                ? 'var(--info)'
                                : node.disabled
                                  ? 'var(--neutral)'
                                  : 'var(--positive)',
                            padding: 'var(--gap-1)',
                            border: 'var(--border)',
                            borderRadius: 'var(--border-radius)',
                            boxShadow: 'var(--box-shadow)',
                        }}
                    >
                        <FileOrFolder type={node.type} />
                        <Font.Bold>{node.title}</Font.Bold>
                    </Group.Row>
                </button>
            </div>

            {isFolder && expanded[node.id] && node.children.length > 0 && (
                <ul className={styles.ul} id={groupId} role="group">
                    {node.children.map((c) => (
                        <RecursiveItem
                            key={c.id}
                            node={c}
                            depth={depth + 1}
                            selectedId={selectedId}
                            setSelectedId={setSelectedId}
                            toggleExpand={toggleExpand}
                            expanded={expanded}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
