import Button from '../../Dumb/Button';
import { chunkByRanges } from '../../utilities/chunk';

import type { Period, PeriodId } from './interfaces';

interface PeriodsProps {
    periods: Array<Period>;
    availablePeriods: Record<PeriodId, boolean>;
    selectedPeriod: string;
    setPeriod: (periodId: PeriodId) => void;
}
export default function Periods({
    periods,
    availablePeriods,
    selectedPeriod,
    setPeriod,
}: PeriodsProps) {
    const groups = chunkByRanges(periods, [
        [0, 4],
        [5, 10],
        [11, 13],
    ]);

    return groups.map((group, pos) => (
        <Button.Group key={`group-${pos}`}>
            {() => (
                <>
                    {group.map((p) => (
                        <Button
                            key={p.id}
                            onClick={() => setPeriod(p.id)}
                            disabled={!availablePeriods[p.id]}
                            isActive={selectedPeriod === p.id}
                        >
                            {p.label}
                        </Button>
                    ))}
                </>
            )}
        </Button.Group>
    ));
}
