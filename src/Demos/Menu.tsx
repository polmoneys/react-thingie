import { useState } from 'react';

import type { Selection } from 'react-aria-components';

import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Menu from '../Dumb/Menu';
import { type DynamicItems } from '../Dumb/Menu/interfaces';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import useMenu from '../utilities/useMenu';

interface SettingsMenu {
    account: string;
    services: string;
    contact: string;
}

const openWindows: DynamicItems = [
    {
        name: 'Left Panel',
        id: 'left',
        onAction: () => ({}),
        children: [{ id: 1, name: 'Final Copy (1)', onAction: () => ({}) }],
    },
    {
        name: 'Right Panel',
        id: 'right',
        onAction: () => ({}),
        children: [
            { id: 2, name: 'index.ts', onAction: () => ({}) },
            { id: 3, name: 'package.json', onAction: () => ({}) },
            { id: 4, name: 'license.txt', onAction: () => ({}) },
        ],
    },
];
export default function DemoMenu() {
    const [openMenu, dispatchMenu] = useMenu<keyof SettingsMenu>(null, {
        onOpen: (key) => console.log('Opened menu:', key),
        onClose: (key) => console.log('Closed menu:', key),
    });

    const menuActions: DynamicItems = [
        {
            id: 'account',
            name: 'Account',
            onAction: () => dispatchMenu('account'),
        },
        {
            id: 'services',
            name: 'Services',
            onAction: () => dispatchMenu('services'),
        },
        {
            id: 'contact',
            name: 'Contact',
            onAction: () => dispatchMenu('contact'),
        },
    ];

    const allActions: DynamicItems = [
        { id: 'cut', name: 'Cut', onAction: () => console.log('') },
        { id: 'copy', name: 'Copy', onAction: () => console.log('') },
        {
            id: 'delete',
            name: 'Delete',
            onAction: () => console.log(''),
            separator: true,
        },
        {
            id: 'share',
            name: 'Share',
            onAction: () => console.log(''),
            header: 'LOVE U',
            children: [
                { id: 'sms', name: 'SMS', onAction: () => console.log('') },
                { id: 'x', name: 'X', onAction: () => console.log('') },
                {
                    id: 'email',
                    name: 'Email',
                    onAction: () => console.log(''),
                    children: [
                        {
                            id: 'work',
                            name: 'Work',
                            onAction: () => console.log(''),
                        },
                        {
                            id: 'personal',
                            name: 'Personal',
                            onAction: () => console.log(''),
                        },
                    ],
                },
            ],
        },
    ];

    const [selected, setSelected] = useState<Selection>(new Set([1, 3]));
    const [selectedSingle, setSelectedSingle] = useState<Selection>(
        new Set([1]),
    );

    return (
        <>
            <GridTemplateColumns
                gridTemplateColumns={{ xs: '170px', sm: 'repeat(4,170px)' }}
                gap={{ xs: 'var(--gap-3)' }}
                breakEqualHeight
            >
                <Menu items={menuActions} label="Settings" />
                <Menu items={allActions} label="Options" />
                <Menu.Sections
                    label="Multiple"
                    items={openWindows}
                    selectionMode="multiple"
                    selectedKeys={selected}
                    onSelectionChange={setSelected}
                />
                <Menu.Sections
                    label="Single"
                    items={openWindows}
                    selectionMode="single"
                    selectedKeys={selectedSingle}
                    onSelectionChange={setSelectedSingle}
                />
            </GridTemplateColumns>

            <br />

            <Group.Col
                component="div"
                dangerous={{
                    maxWidth: 'min(300px,60vw)',
                    backgroundColor: 'var(--neutral)',
                    borderRadius: 'var(--border-radius)',
                    border: 'var(--border)',
                    padding: 'var(--gap-3)',
                    boxShadow: 'var(--shadow)',
                    marginTop: 'var(--gap-1)',
                }}
            >
                {openMenu ? (
                    <>
                        {openMenu === 'account' && (
                            <Font.Bold> Account </Font.Bold>
                        )}
                        {openMenu === 'services' && (
                            <Font.Bold> Services </Font.Bold>
                        )}
                        {openMenu === 'contact' && (
                            <Font.Bold> Contact </Font.Bold>
                        )}
                    </>
                ) : (
                    <Font.Bold>No settings selected</Font.Bold>
                )}
            </Group.Col>
            <br />
        </>
    );
}
