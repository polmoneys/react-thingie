import type { ComponentProps } from 'react';

import Group from '../Group';
import Icon from '../Icon';
import Ring from '../Ring';

interface Props extends Omit<ComponentProps<'select'>, 'onChange'> {
    onChange: (selected: string) => void;
    placeholder: string;
}

export default function Select({
    value,
    onChange,
    children,
    placeholder,
    ...rest
}: Props) {
    return (
        <Group.Row component="label" alignItems="center">
            <Ring>
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    {...rest}
                >
                    <option value="">{placeholder}</option>
                    {children}
                </select>
            </Ring>

            <div style={{ position: 'relative', zIndex: 99 }}>
                <Icon.ChevronDown
                    size={33}
                    circle={false}
                    transform="translate(-44px,3px)"
                />
            </div>
        </Group.Row>
    );
}
