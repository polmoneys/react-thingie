import type { ComponentProps } from 'react';

import Group from '../Group';
import Icon from '../Icon';
import Ring from '../Ring';

/*

<Select
    className="theme-inset"
    placeholder="Choose"
    value={newType}
    onChange={(e) => setNewType(e as NodeType)}
>
    <option value="file">File</option>
    <option value="folder">Folder</option>
</Select>

*/

interface SelectProps extends Omit<ComponentProps<'select'>, 'onChange'> {
    onChange: (selected: string) => void;
    placeholder: string;
}

export default function Select({
    value,
    onChange,
    children,
    placeholder,
    ...rest
}: SelectProps) {
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
