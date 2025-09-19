import type { SelectionAPI } from '../Thingie/interfaces';

import RowHeader from './Header';
import type { RowsProps } from './interfaces';
import Row from './Row';

export default function Rows<T>({
    gridTemplateColumns,
    columns,
    rows,
    gap = '0',
    id = 'demo',
    // "Order 12345"
    label,
    api,
    ...rest
}: RowsProps<T> & { api: SelectionAPI<T> }) {
    return (
        <div role="table" {...rest}>
            <RowHeader
                gridTemplateColumns={gridTemplateColumns}
                columns={columns}
                id={id}
            />

            <div role="rowgroup">
                {rows.map((r, pos) => {
                    const selected = api?.isSelected(r);
                    return (
                        <Row<T>
                            row={r}
                            gridTemplateColumns={gridTemplateColumns}
                            key={`${id}-${pos}`}
                            columns={columns}
                            label={label}
                            rowIndex={pos}
                            id={id}
                            gap={gap}
                            selected={selected}
                            onSelect={() => api.toggle(r)}
                        />
                    );
                })}
            </div>
        </div>
    );
}
