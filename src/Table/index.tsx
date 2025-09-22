import Font from '../Font';
import { COLUMNS, formatSelectedKeys, USERS } from '../utils';

import { Thingie } from './Demo';
import Rows from './Rows';

export default function UsersTable() {
    const { useSelection } = Thingie;
    const api = useSelection();
    const selection = api.exportSelected();

    return (
        <section
            style={{
                margin: 'var(--gap-3) 0',
            }}
        >
            <div className="row gap sm underline">
                <Font.Bold>
                    {formatSelectedKeys(new Set(selection.map((x) => x.name)))}.
                    Total ({api.selectedCount})
                </Font.Bold>
            </div>

            <Rows
                columns={COLUMNS}
                gridTemplateColumns="2fr .5fr .25fr"
                rows={USERS}
                label="users of imaginary app"
                api={api}
                selectedBackgroundColor="var(--accent)"
            />
        </section>
    );
}
