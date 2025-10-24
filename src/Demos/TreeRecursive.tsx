import { type ReactNode, useState } from 'react';

import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import Recursive from '../Dumb/Recursive';
import type { RecursiveItem } from '../Dumb/Recursive/interfaces';
import { findNodeById } from '../Dumb/Recursive/utils';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import { formatSelectedKeys } from '../utilities/intl';
import { has } from '../utils';

interface FileData {
    name: string;
    type: 'file' | 'folder';
}

const sampleData: RecursiveItem<FileData>[] = [
    {
        id: '1',
        data: { name: 'src', type: 'folder' },
        children: [
            {
                id: '1-1',
                data: { name: 'components', type: 'folder' },
                children: [
                    { id: '1-1-1', data: { name: 'Button.tsx', type: 'file' } },
                    { id: '1-1-2', data: { name: 'Input.tsx', type: 'file' } },
                ],
            },
            {
                id: '1-2',
                data: { name: 'utils', type: 'folder' },
                children: [
                    { id: '1-2-1', data: { name: 'helpers.ts', type: 'file' } },
                ],
            },
            { id: '1-3', data: { name: 'App.tsx', type: 'file' } },
        ],
    },
    {
        id: '2',
        data: { name: 'public', type: 'folder' },
        children: [{ id: '2-1', data: { name: 'index.html', type: 'file' } }],
    },
    { id: '3', data: { name: 'package.json', type: 'file' } },
];

export default function DemoRecursive() {
    const [expandedIds, setExpandedIds] = useState<Set<string | number>>(
        new Set(),
    );
    const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
        new Set(),
    );

    const selected =
        [...selectedIds].map((x) => findNodeById(sampleData, x)) ?? [];
    const selectionFormatted = formatSelectedKeys(
        new Set(selected.map((x) => x?.data?.name ?? '')),
    );

    const handleToggle = (
        id: string | number,
        isExpanded: boolean,
        level: number,
    ) => {
        console.log(`Toggled ${id} at level ${level}:`, isExpanded);
        const newExpandedIds = new Set(expandedIds);
        if (isExpanded) {
            newExpandedIds.add(id);
        } else {
            newExpandedIds.delete(id);
        }
        setExpandedIds(newExpandedIds);
    };

    const handleSelect = (id: string | number, level: number) => {
        console.log(`Selected ${id} at level ${level}`);
        const newSelectedIds = new Set(selectedIds);

        // if (multiple) {
        // Multiple selection: toggle
        if (newSelectedIds.has(id)) {
            newSelectedIds.delete(id);
        } else {
            newSelectedIds.add(id);
        }
        // } else {
        //     // Single selection: replace
        //     newSelectedIds.clear();
        //     newSelectedIds.add(id);
        // }

        setSelectedIds(newSelectedIds);
    };

    const renderRecursiveItem = (props: {
        item: RecursiveItem<FileData>;
        level: number;
        isExpanded: boolean;
        isSelected: boolean;
        children?: ReactNode;
        onClick: () => void;
        className: string;
    }) => {
        return (
            <GridTemplateColumns
                padding={{ xs: `0 var(--gap-3) 0 ${props.level * 36}px` }}
                dangerous={{
                    width: 'min(450px, 80vw)',
                    alignItems: 'center',
                    cursor: 'pointer',
                    border: 'var(--border)',
                }}
                gridTemplateColumns={{
                    xs: has(props.children) ? '68px 1fr 68px' : '68px 1fr',
                }}
                onClick={props.onClick}
                className={props.className}
            >
                {props.item.data?.type === 'folder' ? (
                    <Icon.Folder circle={false} size={56} />
                ) : (
                    <Icon.File circle={false} size={56} />
                )}
                <Font>{props.item.data?.name}</Font>
                {has(props.children) ? props.children : null}
            </GridTemplateColumns>
        );
    };

    return (
        <>
            <Alert mood="negative" fitContent>
                <Group.Row gap="var(--gap-2)">
                    {selected[0]?.data?.type === 'folder' ? (
                        <Icon.Folder circle={false} size={28} />
                    ) : (
                        <Icon.File circle={false} size={28} />
                    )}{' '}
                    <Font.Bold> {selectionFormatted}</Font.Bold>
                </Group.Row>
            </Alert>
            <br />
            <Group.Col gap="var(--gap-1)">
                <Recursive
                    items={sampleData}
                    multiple
                    selectedIds={selectedIds}
                    expandedIds={expandedIds}
                    onToggle={handleToggle}
                    onSelect={handleSelect}
                    renderItem={renderRecursiveItem}
                    indentSize={24}
                />
            </Group.Col>

            <br />
        </>
    );
}
