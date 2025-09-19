import Ring from '../Ring';
import { clsx, has } from '../utils';

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
        className,
        color,
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
                )}
                {...(has(color) && { style: { color } })}
            >
                {has(start) && start}
                {children}
                {has(end) && end}
            </button>
        </Ring>
    );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Text = ({ isText, ...rest }: ButtonProps) => <Button {...rest} isText />;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Icon = ({ isIcon, ...rest }: ButtonProps) => <Button {...rest} isIcon />;

// eslint-disable-next-line react-refresh/only-export-components
export default Object.assign(Button, {
    Text,
    Icon,
    Group,
});
