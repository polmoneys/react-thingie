import {
    Menu as MenuReactAria,
    MenuItem,
    type MenuProps,
    MenuTrigger,
    Popover,
    Pressable,
    Separator,
    SubmenuTrigger,
} from 'react-aria-components';

import { has } from '../../utils';
import Font from '../Font';
import IconChevron, { IconChevronDown } from '../Icon/Icons/Chevron';

import type { DynamicItem } from './interfaces';
import MenuSections from './Sections';

interface MyMenuProps<T extends DynamicItem> extends MenuProps<T> {
    label?: string;
}

export default function Menu<T extends DynamicItem>(props: MyMenuProps<T>) {
    const { label, ...rest } = props;
    return (
        <MenuTrigger>
            <Pressable>
                <span role="button" className="my-menu-trigger">
                    <Font component="span"> {label}</Font>
                    <IconChevronDown size={24} circle={false} />
                </span>
            </Pressable>
            <Popover>
                <MenuReactAria {...rest}>
                    {function renderSubmenu(item) {
                        if (item.children) {
                            return (
                                <SubmenuTrigger>
                                    <MenuItem
                                        key={item.name}
                                        onAction={item.onAction}
                                    >
                                        {({ hasSubmenu }) => (
                                            <>
                                                {item.name}

                                                {hasSubmenu && (
                                                    <IconChevron
                                                        size={24}
                                                        circle={false}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </MenuItem>
                                    <Popover>
                                        <MenuReactAria items={item.children}>
                                            {(item) => {
                                                return renderSubmenu(item);
                                            }}
                                        </MenuReactAria>
                                    </Popover>
                                </SubmenuTrigger>
                            );
                        } else {
                            return (
                                <>
                                    <MenuItem
                                        key={item.name}
                                        onAction={item.onAction}
                                    >
                                        {item.name}
                                    </MenuItem>
                                    {has(item?.separator) ? (
                                        <Separator />
                                    ) : null}
                                </>
                            );
                        }
                    }}
                </MenuReactAria>
            </Popover>
        </MenuTrigger>
    );
}

Menu.Sections = MenuSections;
