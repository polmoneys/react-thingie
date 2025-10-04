import { clsx, has } from '../../utils';
import Ring from '../Ring';

import Group from './ButtonGroup';
import type { ButtonProps } from './interfaces';

function Button(props: ButtonProps) {
    const {
        children,
        start,
        end,
        isIcon = false,
        isText = false,
        isActive = false,
        stretch = false,
        className,
        dangerous,
        mood = 'neutral',
        ...buttonProps
    } = props;
    return (
        <Ring>
            <button
                {...buttonProps}
                className={clsx(
                    className,
                    isIcon && 'icon',
                    isText && 'text',
                    isActive && 'active',
                    stretch && 'stretch',
                    mood === 'positive' && 'positive',
                    mood === 'negative' && 'negative',
                )}
                {...(has(dangerous) && { style: dangerous })}
            >
                {has(start) && start}
                {children}
                {has(end) && end}
            </button>
        </Ring>
    );
}

const Text = ({ isText, ...rest }: ButtonProps) => <Button {...rest} isText />;
const Icon = ({ isIcon, ...rest }: ButtonProps) => <Button {...rest} isIcon />;
const Positive = ({ mood, ...rest }: ButtonProps) => (
    <Button {...rest} mood="positive" />
);
const Negative = ({ mood, ...rest }: ButtonProps) => (
    <Button {...rest} mood="negative" />
);

export default Object.assign(Button, {
    Text,
    Icon,
    Group,
    Positive,
    Negative,
});
