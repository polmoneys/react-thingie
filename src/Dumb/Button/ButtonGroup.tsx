import { useState } from 'react';

import { FocusScope } from '@react-aria/focus';

import { clsx } from '../../utils';

import type { ButtonGroupProps } from './interfaces';

export default function Group(props: ButtonGroupProps) {
    const {
        initial = 0,
        className,
        direction = 'horizontal',
        children,
    } = props;

    const [active, setActive] = useState(initial);

    const isVertical = direction === 'vertical';
    const classNames = clsx(className, 'buttonGroup', isVertical && 'vertical');
    return (
        <FocusScope contain>
            <div className={classNames}>
                {children &&
                    children({
                        active,
                        setActive,
                    })}
            </div>
        </FocusScope>
    );
}
