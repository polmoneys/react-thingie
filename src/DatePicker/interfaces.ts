export type PeriodId =
    | 'oneDay'
    | 'oneWeek'
    | 'oneMonths'
    | 'threeMonths'
    | 'sixMonths'
    | 'YTD'
    | 'oneYears'
    | 'threeYears'
    | 'fiveYears'
    | 'sevenYears'
    | 'tenYears'
    | 'inception'
    | 'custom';

export type Period = { id: PeriodId; label: string };
