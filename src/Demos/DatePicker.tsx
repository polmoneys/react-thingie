import { lazy, Suspense, useEffect, useState } from 'react';

import type { Period } from '../DatePicker/interfaces';
import Periods from '../DatePicker/Periods';
import useDates from '../DatePicker/useDates';
import Button from '../Dumb/Button';
import Checkbox from '../Dumb/Checkbox';
import Font from '../Dumb/Font';
import GridTemplateColumns from '../Dumb/Grid/GridTemplateColumns';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';

const Range = lazy(() => import('../DatePicker/Range'));

const periods: Period[] = [
    { id: 'oneDay', label: '1D' },
    { id: 'oneWeek', label: '1W' },
    { id: 'oneMonths', label: '1M' },
    { id: 'threeMonths', label: '3M' },
    { id: 'sixMonths', label: '6M' },
    { id: 'YTD', label: 'YTD' },
    { id: 'oneYears', label: '1Y' },
    { id: 'threeYears', label: '3Y' },
    { id: 'fiveYears', label: '5Y' },
    { id: 'sevenYears', label: '7Y' },
    { id: 'tenYears', label: '10Y' },
    { id: 'inception', label: 'Inception' },
    { id: 'custom', label: 'Custom' },
];

export default function DatesDemo({
    inceptionDates = ['2020-03-15', '2021-06-01'],
}: {
    inceptionDates?: string[];
}) {
    const {
        oldestInceptionDate,
        availablePeriods,
        selectedPeriod,
        startDate,
        endDate,
        endOfMonth,
        setPeriod,
        setCustomRange,
        toggleEndOfMonth,
        showUI,
    } = useDates({
        inceptionDates,
        defaultPeriod: 'oneMonths',
        defaultEndOfMonth: false,
    });

    const [customStart, setCustomStart] = useState(startDate);
    const [customEnd, setCustomEnd] = useState(endDate);

    useEffect(() => {
        setCustomStart(startDate);
        setCustomEnd(endDate);
    }, [startDate, endDate]);

    return (
        <Group flexDirection="column" gap="var(--gap-3)">
            <Periods
                periods={periods}
                availablePeriods={availablePeriods}
                setPeriod={setPeriod}
                selectedPeriod={selectedPeriod}
            />

            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr 44px' }}
                dangerous={{
                    maxWidth: '320px',
                    placeContent: 'start',
                    alignItems: 'center',
                }}
            >
                <Font>
                    Last working day{' '}
                    <Font.Bold component="span">(EOM)</Font.Bold>
                </Font>

                <Checkbox
                    checked={endOfMonth}
                    onChange={(event) => toggleEndOfMonth(event.target.checked)}
                />
            </GridTemplateColumns>

            <GridTemplateColumns
                gridTemplateColumns={{ xs: '1fr ', sm: '1fr 1fr' }}
                className="positive"
                gap={{ xs: 'var(--gap-2)' }}
                dangerous={{
                    border: 'var(--border)',
                    padding: 'var(--gap-2)',
                    maxWidth: 'min(600px,80vw)',
                }}
            >
                <Group variant="grid" gridTemplateColumns="120px 1fr">
                    <Font>Start </Font>
                    <Font.Bold component="strong"> {startDate}</Font.Bold>
                </Group>

                <Group variant="grid" gridTemplateColumns="120px 1fr">
                    <Font>End </Font>
                    <Font.Bold component="strong"> {endDate}</Font.Bold>
                </Group>
            </GridTemplateColumns>
            <Group
                variant="grid"
                gridTemplateColumns="130px 1fr"
                className="negative"
                dangerous={{
                    border: 'var(--border)',
                    padding: 'var(--gap-2)',
                    width: 'fit-content',
                }}
            >
                <Font>Oldest date </Font>
                <Font.Bold component="strong">
                    {oldestInceptionDate ?? '—'}
                </Font.Bold>
            </Group>
            {showUI && (
                <Suspense fallback={<Icon.Loading />}>
                    <Range
                        oldestInceptionDate={oldestInceptionDate}
                        start={customStart}
                        end={customEnd}
                        setStart={setCustomStart}
                        setEnd={setCustomEnd}
                    >
                        <Button
                            onClick={() =>
                                setCustomRange(customStart, customEnd)
                            }
                        >
                            Apply
                        </Button>
                    </Range>
                </Suspense>
            )}
        </Group>
    );
}
