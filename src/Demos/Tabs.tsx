import { useState } from 'react';

import type { Key } from 'react-aria-components';

import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Icon from '../Dumb/Icon';
import Tabs from '../Dumb/Tabs';
import ToolBar from '../Dumb/Toolbar';

export default function TabsDemo() {
    const [tabs, setTabs] = useState([
        {
            id: 1,
            title: 'Tab 1',
            children: (
                <>
                    <br />
                    <Font> Tab body 1</Font>
                </>
            ),
        },
        {
            id: 2,
            title: 'Tab 2',
            children: (
                <>
                    <br />
                    <Font> Tab body 2</Font>{' '}
                </>
            ),
        },
        {
            id: 3,
            title: 'Tab 3',
            children: (
                <>
                    <br />
                    <Font> Tab body 3</Font>
                </>
            ),
        },
    ]);

    const [selectedTabId, setSelectedTabId] = useState<Key>(1);

    const addTab = () => {
        setTabs((tabs) => [
            ...tabs,
            {
                id: tabs.length + 1,
                title: `Tab ${tabs.length + 1}`,
                children: (
                    <>
                        <br />
                        <Font> Tab body ${tabs.length + 1}</Font>
                    </>
                ),
            },
        ]);
    };

    const removeTab = () => {
        if (tabs.length > 1) {
            setTabs((tabs) => tabs.slice(0, -1));
        }
    };

    return (
        <>
            <ToolBar
                label="Add/Remov tabs "
                dangerous={{
                    boxShadow: 'var(--shadow)',
                    border: 'var(--border)',
                }}
            >
                <Button.Transparent border={false} isIcon onClick={addTab}>
                    <Icon.Add />
                </Button.Transparent>
                <Button.Transparent border={false} isIcon onClick={removeTab}>
                    <Icon.X />
                </Button.Transparent>
            </ToolBar>
            <br />

            <Tabs
                tabs={tabs}
                label="Tabs horizontal"
                selectedKey={selectedTabId}
                onSelectionChange={setSelectedTabId}
            />
            <br />
            <Tabs tabs={tabs} label="Tabs vertical" orientation="vertical" />
            <br />
        </>
    );
}
