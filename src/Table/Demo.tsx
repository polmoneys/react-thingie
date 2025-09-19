import createThingie from '../Thingie';
import { type Person,USERS } from '../utils';

import UsersTable from '.';

export const Thingie = createThingie<Person>('TablePeopleSelection');

export default function DemoTable() {
    const { Thingie: TableProvider } = Thingie;
    return (
        <TableProvider
            items={USERS}
            keySelector={(s) => s.name}
            initialSelectedKeys={['Pol']}
        >
            <UsersTable />
        </TableProvider>
    );
}
