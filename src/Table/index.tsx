import Font from '../Font';
import { COLUMNS, USERS } from '../utils';

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
            <div className="row" style={{ gap: 'var(--gap-1)' }}>
                <Font.Bold>{api.selectedCount} </Font.Bold>
                {selection.map((it) => (
                    <Font
                        component="span"
                        dangerousColor="var(--red)"
                        key={it.id}
                    >
                        {it.name}
                    </Font>
                ))}
            </div>

            <Rows
                columns={COLUMNS}
                gridTemplateColumns="2fr .5fr .25fr"
                rows={USERS}
                label="users of imaginary app"
                api={api}
            />
        </section>
    );
}
