import { useCallback, useState } from 'react';

import writeXlsxFile from 'write-excel-file';

import type {
    ExportSingleArgs,
    MultiSheetInput,
    UseExcelExportOptions,
    WriteExcelOptions,
} from './interfaces';

export default function useExcelExport({ onError }: UseExcelExportOptions) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const ensureXlsx = (name: string) =>
        name.toLowerCase().endsWith('.xlsx') ? name : `${name}.xlsx`;

    const onCatch = useCallback(
        (err: unknown) => {
            const e = err instanceof Error ? err : new Error(String(err));
            setError(e);
            if (onError) onError(e);
            else console.error(e);
        },
        [onError],
    );

    const exportSingleSheet = useCallback(
        async (args: ExportSingleArgs): Promise<Blob | void> => {
            setError(null);
            setIsLoading(true);
            try {
                const {
                    dateFormat = 'dd/mm/yyyy',
                    stickyRowsCount,
                    stickyColumnsCount,
                    fontFamily,
                    fontSize,
                    returnBlob = false,
                    headerStyle = { fontWeight: 'bold' },
                    color,
                    backgroundColor,
                } = args.options || {};

                const opts: any = {
                    dateFormat,
                    stickyRowsCount,
                    stickyColumnsCount,
                    fontFamily,
                    fontSize,
                    headerStyle,
                    color,
                    backgroundColor,
                };

                // in browser: if returnBlob === false -> pass fileName to trigger download
                if (!returnBlob) {
                    opts.fileName = ensureXlsx(args.filename);
                }

                if (args.sheetName) opts.sheet = args.sheetName;
                if (args.columns) opts.columns = args.columns;

                const result = await writeXlsxFile(args.data, opts);
                // when fileName provided writeXlsxFile triggers download and returns void
                // when fileName omitted it returns a Blob
                return result as Blob | void;
            } catch (err: any) {
                onCatch(err);
            } finally {
                setIsLoading(false);
            }
        },
        [onCatch],
    );

    const exportMultipleSheets = useCallback(
        async (
            filename: string,
            sheets: MultiSheetInput[],
            options?: WriteExcelOptions,
        ): Promise<Blob | void> => {
            setError(null);
            setIsLoading(true);
            try {
                const {
                    dateFormat = 'dd/mm/yyyy',
                    stickyRowsCount,
                    stickyColumnsCount,
                    fontFamily,
                    fontSize,
                    returnBlob = false,
                    headerStyle = { fontWeight: 'bold' },
                    color,
                    backgroundColor,
                } = options || {};

                const opts: any = {
                    dateFormat,
                    stickyRowsCount,
                    stickyColumnsCount,
                    fontFamily,
                    fontSize,
                    headerStyle,
                    color,
                    backgroundColor,
                };

                if (!returnBlob) {
                    opts.fileName = ensureXlsx(filename);
                }

                const dataArray = sheets.map((s) => s.data);
                const columnsArray = sheets.map((s) => s.columns ?? null);
                const sheetsNames = sheets.map((s) => s.sheetName ?? undefined);

                if (columnsArray.some((c) => c !== null))
                    opts.columns = columnsArray;
                if (sheetsNames.some(Boolean)) opts.sheets = sheetsNames;

                const result = await writeXlsxFile(dataArray, opts);
                return result as Blob | void;
            } catch (err) {
                onCatch(err);
            } finally {
                setIsLoading(false);
            }
        },
        [onCatch],
    );

    return {
        isLoading,
        error,
        exportSingleSheet,
        exportMultipleSheets,
    };
}
