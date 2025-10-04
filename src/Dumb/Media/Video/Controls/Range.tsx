import { type ChangeEvent,type ComponentProps } from 'react';

import styles from '../index.module.css';

interface Props extends ComponentProps<'input'> {
    initial: number;
    onChangeValue: (value: number) => void;
}

export default function Range(props: Props) {
    const { initial = 1, min = 1, max = 100, onChangeValue, ...rest } = props;

    const onChange = (event: ChangeEvent<HTMLInputElement>): void =>
        onChangeValue(Number(event.target.value));
    return (
        <input
            {...rest}
            className={styles.volume}
            type="range"
            min={min}
            max={max}
            value={initial}
            onChange={onChange}
        />
    );
}
