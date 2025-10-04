import { FocusRing } from '@react-aria/focus';
import type { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    autofocus?: boolean;
    within?: boolean;
    isTextInput?: boolean;
    disabled?: boolean;
}

export default function Ring(props: Props) {
    const {
        children,
        autofocus = false,
        within = false,
        isTextInput = false,
        disabled = false,
    } = props;

    return (
        <FocusRing
            focusClass={disabled ? 'ringless' : 'ring'}
            focusRingClass={disabled ? 'ringless' : 'ringKeyboard'}
            {...(autofocus && { autoFocus: autofocus })}
            {...(within && { within })}
            {...(isTextInput && { isTextInput })}
        >
            {children}
        </FocusRing>
    );
}
