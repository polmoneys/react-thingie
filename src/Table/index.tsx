import { COLUMNS, Thingie, USERS } from '../Demos/Tables';
import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';
import Rows from '../Dumb/Rows';
import { formatSelectedKeys } from '../utils';

export default function UsersTable() {
    const { useSelection } = Thingie;
    const api = useSelection();
    const selection = api.exportSelected();

    return (
        <>
            <Alert
                style={{
                    display: 'flex',
                    gap: 'var(--gap-1)',
                    width: 'fit-content',
                    marginTop: 'var(--gap-3)',
                }}
            >
                <Font.Bold className="underline">
                    {formatSelectedKeys(new Set(selection.map((x) => x.name)))}.
                    Total ({api.selectedCount})
                </Font.Bold>
            </Alert>
            <Rows
                columns={COLUMNS}
                gridTemplateColumns="2fr .5fr .25fr"
                rows={USERS}
                label="users of imaginary app"
                api={api}
                selectedBackgroundColor="var(--accent)"
            />
        </>
    );
}
