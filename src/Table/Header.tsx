import { useMemo } from 'react';

import type { Column, RowHeaderProps } from './interfaces';

export default function RowHeader<T>({
    gridTemplateColumns,
    columns,
    gap = '0',
    id = 'demo',
}: RowHeaderProps<T>) {
    const style = useMemo(
        () => ({
            display: 'grid',
            gridTemplateColumns,
            columnGap: gap,
        }),
        [gridTemplateColumns, gap],
    );
    return (
        <div role="row" style={style}>
            {columns.map((col, pos) => {
                const headerId = `${id}-col-${pos + 1}`;
                const label = (col as Column<T>).label ?? String(col.field);

                return (
                    <div
                        key={headerId}
                        id={headerId}
                        role="columnheader"
                        aria-colindex={pos + 1}
                    >
                        <p>{label}</p>
                    </div>
                );
            })}
        </div>
    );
}
