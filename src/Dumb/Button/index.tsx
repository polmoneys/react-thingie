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

export default Object.assign(Button, {
    Text,
    Icon,
    Group,
});
