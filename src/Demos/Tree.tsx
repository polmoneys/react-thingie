import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';
import GridTemplateColumns from '../Dumb/Grid/GridTemplateColumns';
import RecursiveItem, { FileOrFolder } from '../Dumb/Tree/RecursiveItem';
import { initialFileSystem } from '../Dumb/Tree/reducer';
import useTree from '../Dumb/Tree/useTree';

import styles from '../Dumb/Tree/index.module.css';

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
                <Font.Bold> {fs[selectedId]?.title ?? '(none)'}</Font.Bold>
                <FileOrFolder type={fs[selectedId]?.type ?? ''} />
            </Alert>
            <br />
            <GridTemplateColumns
                breakEqualHeight
                gap={{ xs: 'var(--gap-2)' }}
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1.7fr' }}
            >
                <ul className={styles.ul}>
                    <RecursiveItem
                        expanded={expanded}
                        setSelectedId={setSelectedId}
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
