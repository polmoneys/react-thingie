import { useMemo } from 'react';

import Font from '../Font';

import type { Column, RowHeaderProps } from './interfaces';

export default function RowHeader<T>({
    gridTemplateColumns,
    columns,
    id = 'demo',
    px,
}: RowHeaderProps<T>) {
    const style = useMemo(
        () => ({
            display: 'grid',
            gridTemplateColumns,
            borderBottom: 'var(--border)',
        }),
        [gridTemplateColumns],
    );
    return (
        <div role="row" style={style}>
            {columns.map((col, pos) => {
                const headerId = `${id}-col-${pos + 1}`;
                const label = (col as Column<T>).label ?? String(col.field);
                const isLast = pos === columns.length - 1;
                const styleCell = {
                    padding: `0 ${px}`,
                    ...(!isLast && {
                        borderRight: 'var(--border)',
                    }),
                };
                return (
                    <div
                        key={headerId}
                        id={headerId}
                        role="columnheader"
                        aria-colindex={pos + 1}
                        style={styleCell}
                    >
                        <Font.Bold>{label}</Font.Bold>
                    </div>
                );
            })}
        </div>
    );
}
