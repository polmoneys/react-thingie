import { COLUMNS, Thingie, USERS } from '../../Demos/Tables';
import { formatSelectedKeys } from '../../utilities/intl';
import Alert from '../Alert';
import Font from '../Font';
import Rows from '../Rows';

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
                <Font.Bold>
                    {formatSelectedKeys(new Set(selection.map((x) => x.name)))}.
                    Total ({api.selectedCount})
                </Font.Bold>
            </Alert>
            <br />
            <Rows
                columns={COLUMNS}
                gridTemplateColumns="2fr 1fr .25fr"
                rows={USERS}
                label="users of imaginary app"
                api={api}
                selectedBackgroundColor="var(--positive)"
                style={{
                    border: 'var(--border)',
                    boxShadow: 'var(--shadow)',
                    borderRadius: 'var(--border-radius)',
                }}
                px="var(--gap-1)"
            />
        </>
    );
}
