import { type CSSProperties, type ForwardedRef, forwardRef } from 'react';

import { clsx, has } from '../../utils';
import Ring from '../Ring';

import { type TextInputLabelProps } from './interfaces';

const TextInputLabel = forwardRef<HTMLInputElement, TextInputLabelProps>(
    (props: TextInputLabelProps, ref: ForwardedRef<HTMLInputElement>) => {
        const {
            id,
            onChange,
            onChangeNative,
            gridTemplateColumns,
            gridTemplateRows,
            label,
            errorElementId,
            className,
            classNames,
            ...rest
        } = props;

        const options = {
            display: 'grid',
            ...(has(gridTemplateColumns) && { gridTemplateColumns }),
            ...(has(gridTemplateRows) && { gridTemplateRows }),
            alignItems: 'center',
        } as CSSProperties;
        return (
            <div style={options} {...(has(className) && { className })}>
                {label && <label htmlFor={id}>{label}</label>}
                <Ring isTextInput>
                    <input
                        {...rest}
                        className={clsx(classNames?.input)}
                        id={id}
                        name={id}
                        type="text"
                        {...(ref != null && { ref })}
                        {...(has(errorElementId) && {
                            'aria-describedby': errorElementId,
                        })}
                        onChange={(event) => {
                            onChangeNative?.(event);
                            onChange(event.target.value);
                        }}
                    />
                </Ring>
            </div>
        );
    },
);

export default TextInputLabel;
