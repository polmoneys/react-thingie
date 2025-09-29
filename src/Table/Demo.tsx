import type { CSSProperties, ReactNode } from 'react';

import createThingie from '../Thingie';
import { has } from '../utils';

import type { Column } from './interfaces';
import UsersTable from '.';

export type Person = { id: number; name: string; email?: string; age?: number };

const ColumnCell = ({
    children,
    dangerous,
}: {
    children: ReactNode;
    dangerous?: CSSProperties;
}) => (
    <div
        style={{
            width: '100%',
            backgroundColor: 'rgba(0,0,0,.1)',
            ...(has(dangerous) && dangerous),
        }}
    >
        <strong>{children}</strong>
    </div>
);

export const COLUMNS: Column<Person>[] = [
    {
        label: 'Name',
        field: 'name',
        render: (v) => (
            <ColumnCell dangerous={{ paddingLeft: 'var(--gap-1)' }}>
                {v as string}
            </ColumnCell>
        ),
    },
    {
        label: 'Email',
        field: 'email',
        render: (v) => <ColumnCell>{v as string}</ColumnCell>,
    },
    {
        label: 'Age',
        field: 'age',
        render: (v) => (
            <ColumnCell>
                <strong>{v as string}</strong>
            </ColumnCell>
        ),
    },
];

export const USERS: Array<Person> = [
    { id: 1, name: 'A', email: 'a@x', age: 20 },
    { id: 2, name: 'B', email: 'b@x', age: 30 },
    { id: 3, name: 'Pol', email: 'b@x', age: 43 },
];

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
