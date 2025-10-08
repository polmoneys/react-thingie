import { clsx } from '../../utils';
import Button from '../Button';
import Font from '../Font';
import Group from '../Group';
import Icon from '../Icon';
import Shape from '../Shape';

import { type ID, type NodeType, type RenderNode } from './interfaces';

import styles from './index.module.css';

const INDENT_PX = 22;

export const FileOrFolder = ({ type }: { type: NodeType }) => {
    return type === 'folder' ? (
        <Shape.Square size={20} />
    ) : (
        <Shape sides={5} size={20} />
    );
};

interface Props {
    node: RenderNode;
    toggleExpand: (id: ID) => void;
    expanded: Record<number, boolean>;
    setSelectedId: React.Dispatch<React.SetStateAction<number>>;
    depth?: number;
}

export default function RecursiveItem(props: Props) {
    const { node, depth = 0, setSelectedId, toggleExpand, expanded } = props;
    // const original = state[node.id];
    const isFolder = node.type === 'folder';
    return (
        <li className={styles.li}>
            <div
                className={clsx(styles.row, node.disabled && styles.disabled)}
                onClick={() => {
                    if (node.disabled) return;
                    console.log({ node });
                    setSelectedId(node.id);
                }}
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
                    >
                        {expanded[node.id] ? (
                            <Icon.ChevronDown circle={false} size={48} />
                        ) : (
                            <Icon.Chevron circle={false} size={48} />
                        )}
                    </Button.Transparent>
                ) : null}

                <Group.Row
                    alignItems="center"
                    dangerous={{
                        backgroundColor: node.disabled
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
            </div>

            {isFolder && expanded[node.id] && node.children.length > 0 && (
                <ul className={styles.ul}>
                    {node.children.map((c) => (
                        <RecursiveItem
                            key={c.id}
                            node={c}
                            depth={depth + 1}
                            toggleExpand={toggleExpand}
                            setSelectedId={setSelectedId}
                            expanded={expanded}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}
