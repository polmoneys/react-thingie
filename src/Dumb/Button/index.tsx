import { type ForwardedRef, forwardRef } from 'react';

import { clsx, has } from '../../utils';
import Ring from '../Ring';

import Group from './Group';
import type { ButtonProps } from './interfaces';

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
        const {
            children,
            start,
            end,
            isIcon = false,
            isText = false,
            isActive = false,
            stretch = false,
            unset = false,
            isPending,
            className,
            dangerous,
            mood = 'neutral',
            ...buttonProps
        } = props;
        return (
            <Ring>
                <button
                    disabled={isPending}
                    {...(ref != null && { ref })}
                    {...buttonProps}
                    className={clsx(
                        className,
                        isIcon && 'icon',
                        isText && 'text',
                        isActive && 'active',
                        isPending && 'isPending',
                        stretch && 'stretch',
                        unset && 'unset',
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
    },
);

const Unset = ({ unset, ...rest }: ButtonProps) => <Button {...rest} unset />;
const Text = ({ isText, ...rest }: ButtonProps) => <Button {...rest} isText />;
const Icon = ({ isIcon, ...rest }: ButtonProps) => <Button {...rest} isIcon />;
const Positive = ({ mood, ...rest }: ButtonProps) => (
    <Button {...rest} mood="positive" />
);
const Negative = ({ mood, ...rest }: ButtonProps) => (
    <Button {...rest} mood="negative" />
);

const Transparent = ({ dangerous, ...rest }: ButtonProps) => (
    <Button
        {...rest}
        dangerous={{
            ...(has(dangerous) && { dangerous }),
            backgroundColor: 'var(--transparent)',
        }}
    />
);

export default Object.assign(Button, {
    Text,
    Icon,
    Group,
    Positive,
    Negative,
    Unset,
    Transparent,
});
