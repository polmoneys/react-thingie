import { type ChangeEvent, useEffect, useState } from 'react';

import styles from './index.module.css';

interface RangeMultiProps {
    min: number;
    max: number;
    initialMin: number;
    initialMax: number;
    onChange?: (min: number, max: number) => void;
    id: string;
}

/*
<Slider
    onChange={(min, max) => console.log({ min, max })}
    min={0}
    max={100}
    initialMin={12}
    initialMax={66}
  />
*/
export default function RangeMulti({
    min,
    max,
    initialMin,
    initialMax,
    onChange,
    id,
}: RangeMultiProps) {
    const [minVal, setMinVal] = useState(initialMin);
    const [maxVal, setMaxVal] = useState(initialMax);

    const updateMinVal = (event: ChangeEvent<HTMLInputElement>): void => {
        const val = parseInt(event.target.value, 10);
        setMinVal(val < maxVal ? val : maxVal);
    };

    const updateMaxVal = (event: ChangeEvent<HTMLInputElement>): void => {
        const val = parseInt(event.target.value, 10);
        setMaxVal(val > minVal ? val : minVal);
    };

    useEffect(() => {
        if (onChange == null) return;
        onChange?.(minVal, maxVal);
    }, [minVal, maxVal, onChange]);

    const css: Record<string, string | number> = {
        '--minVal': minVal,
        '--maxVal': maxVal,
        '--minLimit': min,
        '--maxLimit': max,
    };
    return (
        <div className={styles.range} style={css}>
            <input
                type="range"
                id={`${id}-min`}
                min={min}
                max={max}
                step="1"
                value={minVal}
                onChange={updateMinVal}
            />
            <input
                type="range"
                id={`${id}-max`}
                min={min}
                max={max}
                step="1"
                value={maxVal}
                onChange={updateMaxVal}
            />
        </div>
    );
}
