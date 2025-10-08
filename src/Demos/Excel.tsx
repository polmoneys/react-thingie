import { useMemo } from 'react';

import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Icon from '../Dumb/Icon';
import ToolBar from '../Dumb/Toolbar';
import useExcelExport from '../Excel';
import type { ColumnDefinition } from '../Excel/interfaces';

const monthEnd = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0));

const makeYearData = (year: number, basePrice: number, volatility = 0.06) => {
    // produce 12 month closing prices with light randomness
    const rows: any[] = [];
    rows.push([{ value: 'Name' }, { value: 'Date' }, { value: 'Close' }]);

    let price = basePrice;
    for (let m = 0; m < 12; m++) {
        // small random walk
        const change = (Math.random() * 2 - 1) * volatility * price;
        price = Math.max(1, +(price + change).toFixed(2));
        rows.push([
            {
                value: `$TOCK NAM€ ${m}`,
                fontWeight: 'bold',
                color: '#f9f9f9',
                backgroundColor: '#222222',
            },
            { value: monthEnd(year, m) },
            { value: price, format: '#,##0.00' },
        ]);
    }
    return rows;
};

const columns = [
    { align: 'left', width: 80 },
    { align: 'right', width: 22 },
    { align: 'right', width: 22 },
] as Array<ColumnDefinition>;

export default function DemoExcel() {
    const { exportSingleSheet, exportMultipleSheets, isLoading } =
        useExcelExport({
            onError: () => console.log('Export failed. Please try again.'),
        });

    const year1Rows = useMemo(() => makeYearData(2023, 120), []);
    const year2Rows = useMemo(() => makeYearData(2024, 180), []);

    const onExport = async () => {
        await exportSingleSheet({
            filename: 'fake-tech-stock-year-1',
            data: year1Rows,
            columns,
            sheetName: 'Year 1 (2023)',
        });
    };

    const onExportMultipleSheets = async () => {
        await exportMultipleSheets('fake-tech-stock-2023-2024', [
            { data: year1Rows, columns, sheetName: 'Year 1 (2023)' },
            { data: year2Rows, columns, sheetName: 'Year 2 (2024)' },
        ]);
    };

    return (
        <>
            <Font>Toolbar to export T[] to Excel. Choose 1 sheet or 2</Font>
            <br />
            <ToolBar
                label="exports"
                dangerous={{ backgroundColor: 'var(--negative)' }}
            >
                <ToolBar.Group label="sheet 1" separator="vertical">
                    <Button.Transparent
                        isPending={isLoading}
                        isIcon
                        onClick={onExport}
                    >
                        <Icon.ExportSheet />
                    </Button.Transparent>
                </ToolBar.Group>
                <ToolBar.Group label="sheet 1 and 2">
                    <Button.Transparent
                        isPending={isLoading}
                        isIcon
                        onClick={onExportMultipleSheets}
                    >
                        <Icon.ExportSheets fillPolyLines="currentColor" />
                    </Button.Transparent>
                </ToolBar.Group>
            </ToolBar>
            <br />
        </>
    );
}
