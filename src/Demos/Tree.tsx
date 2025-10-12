import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Tree, { FileOrFolder } from '../Dumb/Tree/';
import type { FileSystem } from '../Dumb/Tree/interfaces';
import useTree from '../Dumb/Tree/useTree';
import GridTemplateColumns from '../Enlightment/GridTemplateColumns';

import styles from '../Dumb/Tree/index.module.css';

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

export default function FileSystemTree() {
    const {
        tree,
        state: fs,
        selectedId,
        setSelectedId,
        expanded,
        toggleExpand,
    } = useTree(initialFileSystem);
    return (
        <>
            <Alert mood="negative" fitContent>
                <Group.Row gap="var(--gap-2)">
                    <FileOrFolder type={fs[selectedId]?.type ?? ''} />
                    <Font.Bold> {fs[selectedId]?.title ?? '(none)'}</Font.Bold>
                </Group.Row>
            </Alert>
            <br />
            <GridTemplateColumns
                breakEqualHeight
                gap={{ xs: 'var(--gap-2)' }}
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1.7fr' }}
            >
                <ul className={styles.ul}>
                    <Tree
                        expanded={expanded}
                        setSelectedId={setSelectedId}
                        selectedId={selectedId}
                        toggleExpand={toggleExpand}
                        node={tree}
                        depth={0}
                    />
                </ul>

                {/*<form className="theme positive">
                    <Font> You may need to select an item for some ops:</Font>
                    <br />
                    <GridTemplateColumns
                        gap={{ xs: 'var(--gap-2)' }}
                        gridTemplateColumns={{
                            xs: '1fr',
                            md: '1fr .3fr .3fr',
                        }}
                        className="theme"
                    >
                        <TextInputLabel
                            label="Name"
                            id="rename"
                            value={newName}
                            onChange={(v) => setNewName(v)}
                            gridTemplateColumns=".3fr 1fr"
                            classNames={{ input: 'theme-inset' }}
                        />
                        <Button onClick={() => onRename()}>Rename</Button>

                        <Button.Transparent
                            isIcon
                            onClick={() => setNewName('')}
                        >
                            <Icon.X size={36} />
                        </Button.Transparent>
                    </GridTemplateColumns>
                    <br />

                    <GridTemplateColumns
                        gap={{ xs: 'var(--gap-2)' }}
                        gridTemplateColumns={{
                            xs: '1fr',
                            md: '.7fr .2fr .2fr ',
                        }}
                        className="theme"
                    >
                        <TextInputLabel
                            id="add"
                            label="Child"
                            placeholder="name"
                            value={newName}
                            onChange={(v) => setNewName(v)}
                            gridTemplateColumns=".3fr 1fr"
                            classNames={{ input: 'theme-inset' }}
                        />
                        <Select
                            className="theme-inset"
                            placeholder="Choose"
                            value={newType}
                            onChange={(e) => setNewType(e as NodeType)}
                        >
                            <option value="file">File</option>
                            <option value="folder">Folder</option>
                        </Select>

                        <div>
                            <Button.Transparent isIcon onClick={() => onAdd()}>
                                <Icon.Add size={36} />
                            </Button.Transparent>
                            <Button.Transparent
                                isIcon
                                onClick={() => {
                                    setNewName('');
                                    setNewType('file');
                                }}
                            >
                                <Icon.X size={36} />
                            </Button.Transparent>
                        </div>
                    </GridTemplateColumns>
                    <br />

                    <Group.Row alignItems="center" className="theme">
                        <Select
                            placeholder="Move to"
                            value={moveTarget ?? ''}
                            onChange={(e) =>
                                setMoveTarget(e === '' ? null : Number(e))
                            }
                            className="theme-inset"
                        >
                            {folderOptions.map((f) => (
                                <option key={f.id} value={f.id}>
                                    {f.title} (id:{f.id})
                                </option>
                            ))}
                        </Select>

                        <Button onClick={() => onMove()}>Move</Button>
                        <Button.Transparent isIcon onClick={() => onRemove()}>
                            <Icon.Remove size={36} />
                        </Button.Transparent>
                    </Group.Row>
                </form>*/}
            </GridTemplateColumns>
        </>
    );
}
