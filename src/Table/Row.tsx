import { useMemo } from 'react';

import type { RowProps } from './interfaces';

export default function Row<T>({
    gridTemplateColumns,
    columns,
    row,
    gap = '0',
    selected = false,
    id = 'demo',
    rowIndex = 0,
    // "Order 12345"
    label,
    onSelect,
}: RowProps<T>) {
    const containerStyle = useMemo(
        () => ({
            display: 'grid',
            gridTemplateColumns,
            columnGap: gap,
            ...(selected && {
                backgroundColor: 'var(--red)',
            }),
        }),
        [gridTemplateColumns, gap, selected],
    );

    const rowHeaderId = `${id}-row-${rowIndex}-header`;

    return (
        <div
            aria-label={label}
            role="row"
            aria-selected={selected ?? undefined}
            aria-labelledby={rowHeaderId}
            style={containerStyle}
            // +2 because header row is row 1
            aria-rowindex={rowIndex + 2}
            onClick={() => onSelect?.()}
        >
            {columns.map((col, pos) => {
                const key = String(col.field) + '-' + pos;
                const value = (row as T)[col.field];
                const columnHeaderId = `${id}-col-${pos + 1}`;
                const isFirst = pos === 0;

                return (
                    <div
                        role="cell"
                        key={key}
                        aria-labelledby={columnHeaderId}
                        aria-colindex={pos + 1}
                        id={isFirst ? rowHeaderId : undefined}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr',
                        }}
                    >
                        {col.render(value, row, rowIndex)}
                    </div>
                );
            })}
        </div>
    );
}

// export const Row = memo(RowInner) as typeof RowInner;
