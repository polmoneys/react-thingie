import { type ChangeEvent } from 'react';

import { clsx } from '../utils';

import type { RadioProps } from './interfaces';

import styles from './index.module.css';

export default function Radio(props: RadioProps) {
    const { onChangeAsString, id, name, checked, value, children, ...rest } =
        props;

    const onRadioChange = (event: ChangeEvent<HTMLInputElement>) =>
        onChangeAsString?.(event.target.value);

    return (
        <label
            htmlFor={id}
            className={clsx(styles.label, checked && styles.checked)}
        >
            <input
                type="radio"
                id={id}
                name={name}
                value={value}
                checked={checked}
                onChange={onRadioChange}
                {...rest}
            />

            {children({
                checked: props?.checked ?? false,
            })}
        </label>
    );
}
