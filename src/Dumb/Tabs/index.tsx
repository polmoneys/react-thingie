import { type ReactNode } from 'react';

import {
    Collection,
    Tab,
    TabList,
    TabPanel,
    Tabs as TabsReactAria,
    type TabsProps,
} from 'react-aria-components';

export default function Tabs(
    props: TabsProps & {
        label: string;
        tabs: Array<{ id: number; children: ReactNode; title: string }>;
    },
) {
    const { tabs, label, ...rest } = props;

    return (
        <>
            <TabsReactAria {...rest}>
                <TabList aria-label={label} items={tabs}>
                    {(item) => <Tab className="my-tab">{item.title}</Tab>}
                </TabList>
                <Collection items={tabs}>
                    {(item) => <TabPanel>{item.children}</TabPanel>}
                </Collection>
            </TabsReactAria>
        </>
    );
}
