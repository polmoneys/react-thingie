import { useEffect, useState } from 'react';

import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import TextInputLabel from '../Dumb/InputText';
import ToolBar from '../Dumb/Toolbar';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import useItemEditor from '../Smart-ish/useItem';

type UserServer = {
    id: number;
    name: string;
    birthDate: string; // ISO
    address: { city: string; zip: string };
};

type UserDraft = {
    id: number;
    name: string;
    birthDate: Date | null;
    city: string;
    zip: string;
};

const mapper = {
    toDraft: (s: UserServer): UserDraft => ({
        id: s.id,
        name: s.name,
        birthDate: s.birthDate ? new Date(s.birthDate) : null,
        city: s.address?.city ?? '',
        zip: s.address?.zip ?? '',
    }),
    fromDraft: (d: UserDraft): UserServer => ({
        id: d.id,
        name: d.name,
        birthDate: d.birthDate ? d.birthDate.toISOString() : '',
        address: { city: d.city, zip: d.zip },
    }),
};

const initialServerUser: UserServer = {
    id: 1,
    name: 'Alice',
    birthDate: '2022-05-11T12:00:00.000Z',
    address: { city: 'Paris', zip: '75000' },
};
export default function DemoEditor() {
    const editor = useItemEditor<UserServer, UserDraft>(initialServerUser, {
        mapper,
    });

    const [nameInput, setNameInput] = useState(editor.draft.name);

    // keep input in sync if draft changes externally (undo/rollback)
    useEffect(() => {
        setNameInput(editor.draft.name);
    }, [editor.draft.name]);

    return (
        <>
            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 140px' }}
                dangerous={{
                    alignItems: 'end',
                    alignContent: 'end',
                }}
                gap={{ xs: 'var(--gap-4)' }}
            >
                <TextInputLabel
                    id="test-editor"
                    label="name"
                    value={nameInput}
                    onChange={(v) => setNameInput(v)}
                    onBlur={() => editor.set({ name: nameInput })}
                    placeholder="Type name and blur (or press Set Name)"
                />
                <Button onClick={() => editor.set({ name: nameInput })}>
                    Set Name
                </Button>
            </GridTemplateColumns>
            <br />
            <ToolBar label="Operate" dangerous={{ gap: 'var(--gap-2)' }}>
                <Button onClick={() => editor.setAt('birthDate', new Date())}>
                    Set date (now)
                </Button>
                <Button
                    onClick={() => editor.undo()}
                    disabled={!editor.canUndo}
                >
                    Undo
                </Button>
                <Button onClick={() => editor.rollback()}>
                    Rollback (reset to original)
                </Button>
                <Button
                    onClick={() => {
                        const payload = editor.commit();
                        console.log('commit payload:', payload);
                        // simulate server acceptance by calling onServerResponse200
                        editor.onServerResponse200(payload as UserServer);
                    }}
                >
                    Commit (simulate server)
                </Button>
            </ToolBar>
            <br />

            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }}
                gap={{ xs: 'var(--gap-4)' }}
            >
                <Alert mood="positive">
                    <Font.Bold>Draft:</Font.Bold>
                    <pre style={{ overflow: 'scroll' }}>
                        {JSON.stringify(
                            editor.draft,
                            (_k, v) =>
                                v instanceof Date ? v.toISOString() : v,
                            2,
                        )}
                    </pre>
                </Alert>

                <Alert>
                    <Font.Bold>Original (server):</Font.Bold>
                    <pre style={{ overflow: 'scroll' }}>
                        {JSON.stringify(editor.original, null, 2)}
                    </pre>
                </Alert>
            </GridTemplateColumns>
            <br />
            <Alert mood="negative">
                <Font.Bold>History (safe debug):</Font.Bold>
                <pre style={{ overflow: 'scroll' }}>
                    {JSON.stringify(editor._historyForDebug(), null, 2)}
                </pre>
            </Alert>
            <br />
        </>
    );
}
