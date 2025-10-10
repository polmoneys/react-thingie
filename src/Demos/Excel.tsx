import { useState } from 'react';

import Button from '../Dumb/Button';
import useExcelExport from '../Dumb/Excel';
import type { ColumnDefinition } from '../Dumb/Excel/interfaces';
import Font from '../Dumb/Font';
import Icon from '../Dumb/Icon';
import ToolBar from '../Dumb/Toolbar';

import { demoPlaces } from './Destinations';

const columns = [
    { align: 'left', width: 80 },
    { align: 'right', width: 22 },
    { align: 'right', width: 22 },
] as Array<ColumnDefinition>;

const sheet1Places = demoPlaces.slice(0, 15).map((p) => [
    {
        value: p.city,
        fontWeight: 'bold',
        backgroundColor: '#cccccc',
    },
    {
        value: p.state ?? '-',
    },
    {
        value: p.country,
    },
]);
const sheet2Places = demoPlaces.slice(15, demoPlaces.length - 1).map((p) => [
    {
        value: p.city,
        fontWeight: 'bold',
        backgroundColor: '#cccccc',
    },
    {
        value: p.state ?? '-',
    },
    {
        value: p.country,
    },
]);

export default function DemoExcel() {
    const [open, setOpen] = useState(true);

    const { exportSingleSheet, exportMultipleSheets, isLoading } =
        useExcelExport({
            onError: () => console.log('Export failed. Please try again.'),
        });

    const onExport = async () => {
        await exportSingleSheet({
            filename: 'destinations-top-15',
            data: sheet1Places,
            columns,
            sheetName: 'top 15 cities (2025)',
        });
    };

    const onExportMultipleSheets = async () => {
        await exportMultipleSheets('fake-tech-stock-2023-2024', [
            { data: sheet1Places, columns, sheetName: 'top 15 cities (2025)' },
            {
                data: sheet2Places,
                columns,
                sheetName: 'top 15-25 cities (2025)',
            },
        ]);
    };

    return (
        <>
            <Font>Toolbar to export T[] to Excel. Choose 1 sheet or 2</Font>
            <br />
            <ToolBar
                label="exports"
                dangerous={{
                    backgroundColor: 'var(--negative)',
                    border: 'var(--border)',
                    boxShadow: 'var(--shadow)',
                }}
            >
                <ToolBar.Group label="Info" separator="vertical">
                    <Button.Transparent
                        isPending={isLoading}
                        isIcon
                        onClick={() => setOpen((prev) => !prev)}
                    >
                        {open ? <Icon.X /> : <Icon.Add />}
                    </Button.Transparent>
                </ToolBar.Group>

                {open && (
                    <>
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
                    </>
                )}
            </ToolBar>
            <br />
        </>
    );
}
