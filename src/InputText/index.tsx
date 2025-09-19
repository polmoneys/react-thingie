import { type CSSProperties, type ForwardedRef, forwardRef } from 'react';

import Ring from '../Ring';
import { has } from '../utils';

import { type TextInputLabelProps } from './interfaces';

const TextInputLabel = forwardRef<HTMLInputElement, TextInputLabelProps>(
    (props: TextInputLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
        const {
            id,
            // value,
            onChange,
            gridTemplateColumns,
            gridTemplateRows,
            label,
            errorElementId,
            className,
            ...rest
        } = props;

        const options = {
            display: 'grid',
            ...(has(gridTemplateColumns) && { gridTemplateColumns }),
            ...(has(gridTemplateRows) && { gridTemplateRows }),
        } as CSSProperties;
        return (
            <Ring>
                <div style={options} {...(has(className) && { className })}>
                    <label htmlFor={id}>{label}</label>
                    <input
                        {...rest}
                        id={id}
                        name={id}
                        type="text"
                        {...(ref != null && { ref })}
                        {...(has(errorElementId) && {
                            'aria-describedby': errorElementId,
                        })}
                        onChange={(event) => onChange(event.target.value)}
                    />
                </div>
            </Ring>
        );
    },
);

export default TextInputLabel;
