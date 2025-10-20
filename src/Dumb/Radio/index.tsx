import { type ChangeEvent } from 'react';

import { clsx } from '../../utils';
import Ring from '../Ring';

import type { RadioProps } from './interfaces';

export default function Radio(props: RadioProps) {
    const {
        onChangeAsString,
        id,
        name,
        checked,
        value,
        children,
        className,
        ...rest
    } = props;

    const onRadioChange = (event: ChangeEvent<HTMLInputElement>) =>
        onChangeAsString?.(event.target.value);

    return (
        <label htmlFor={id} className={clsx(className)}>
            <Ring>
                <input
                    type="radio"
                    id={id}
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={onRadioChange}
                    className="radio"
                    {...rest}
                />
            </Ring>

            {children({
                checked: props?.checked ?? false,
            })}
        </label>
    );
}
