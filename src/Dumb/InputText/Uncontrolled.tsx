import {
    type ComponentProps,
    type CSSProperties,
    type ForwardedRef,
    forwardRef,
} from 'react';

import { has } from '../../utils';
import Alert from '../Alert';
import Font from '../Font';
import Ring from '../Ring';

const TextInputUncontrolled = forwardRef<
    HTMLInputElement,
    ComponentProps<'input'> & {
        errorToDisplay: string;
        gridTemplateColumns: string;
        label: string;
    }
>(
    (
        props: ComponentProps<'input'> & {
            errorToDisplay?: string;
            gridTemplateColumns: string;
            label: string;
        },
        ref: ForwardedRef<HTMLInputElement>,
    ) => {
        const {
            id,
            gridTemplateColumns,
            label,
            errorToDisplay,
            style,
            ...rest
        } = props;

        const options = {
            display: 'grid',
            ...(has(gridTemplateColumns) && { gridTemplateColumns }),
            // ...(has(gridTemplateRows) && { gridTemplateRows }),
            ...(has(style) && style),
            alignItems: 'center',
        } as CSSProperties;
        return (
            <div style={options}>
                {label && <label htmlFor={id}>{label}</label>}
                <Ring isTextInput>
                    <input
                        {...rest}
                        id={id}
                        name={id}
                        type="text"
                        {...(ref != null && { ref })}
                        aria-describedby={
                            has(errorToDisplay) ? 'email-error' : undefined
                        }
                        aria-invalid={!!errorToDisplay}
                    />
                </Ring>
                {errorToDisplay && (
                    <Alert id={`${id}-error`}>
                        <Font>{errorToDisplay}</Font>
                    </Alert>
                )}
            </div>
        );
    },
);

export default TextInputUncontrolled;
