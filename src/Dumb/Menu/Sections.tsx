import {
    Collection,
    Header,
    Menu as MenuReactAria,
    MenuItem,
    type MenuProps,
    MenuSection,
    MenuTrigger,
    Popover,
    Pressable,
} from 'react-aria-components';

import Font from '../Font';
import Icon from '../Icon';

import type { DynamicItem } from './interfaces';

interface MyMenuSectionsProps<T extends DynamicItem> extends MenuProps<T> {
    label?: string;
}

export default function MenuSections<T extends DynamicItem>(
    props: MyMenuSectionsProps<T>,
) {
    const { label, ...rest } = props;
    return (
        <MenuTrigger>
            <Pressable>
                <span role="button" className="my-menu-trigger">
                    <Font component="span"> {label}</Font>
                    <Icon.ChevronDown size={24} circle={false} />
                </span>
            </Pressable>
            <Popover>
                <MenuReactAria {...rest}>
                    {(section) => (
                        <MenuSection>
                            <Header>{section.name}</Header>
                            <Collection items={section.children}>
                                {(item) => <MenuItem>{item.name}</MenuItem>}
                            </Collection>
                        </MenuSection>
                    )}
                </MenuReactAria>
            </Popover>
        </MenuTrigger>
    );
}
