export interface UseExcelExportOptions {
    onError?: (error: Error) => void;
}

export type AnyCell =
    | {
          type?: any; // String | Number | Boolean | Date | "Formula"
          value?: any;
          format?: string;
          /*
          0.00 — Floating-point number with 2 decimal places. Example: 1234.56.
          0.000 — Floating-point number with 3 decimal places. Example: 1234.567.
          #,##0 — Number with a comma as a thousands separator, as used in most English-speaking countries. Example: 1,234,567.
          #,##0.00 — Currency, as in most English-speaking countries. Example: 1,234.50.
          0% — Percents. Example: 30%.
          0.00% — Percents with 2 decimal places. Example: 30.00%.
          */
          align?: 'left' | 'center' | 'right';
          width?: number;
          color?: string;
          backgroundColor?: string;
          fontWeight?: string | number;
      }
    | null
    | undefined;

export type Row = Array<AnyCell>;
export type SheetData = Array<Row>;

export type ColumnDefinition = {
    align?: 'left' | 'center' | 'right';
    width?: number;
    color?: string;
    backgroundColor?: string;
};

export type WriteExcelOptions = {
    dateFormat?: string;
    stickyRowsCount?: number;
    stickyColumnsCount?: number;
    fontFamily?: string;
    fontSize?: number;
    color?: string;
    backgroundColor?: string;
    // if true, do NOT pass fileName so writeXlsxFile returns a Blob
    returnBlob?: boolean;
    headerStyle?: {
        fontWeight?: string | number;
        fontFamily?: string;
        fontSize?: number;
        // extend with other style props if needed
    };
};

export type ExportSingleArgs = {
    filename: string;
    // desired filename WITHOUT or WITH .xlsx
    data: SheetData;
    columns?: ColumnDefinition[] | null;
    sheetName?: string;
    options?: WriteExcelOptions;
};

export type MultiSheetInput = {
    data: SheetData;
    columns?: ColumnDefinition[] | null;
    sheetName?: string;
};
