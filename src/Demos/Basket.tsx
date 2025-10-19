import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import Toolbar from '../Dumb/Toolbar';
import useBasket from '../Smart-ish/useBasket';
import useTanstackQuery from '../Smart-ish/useTanstackQuery';
import { pluralize } from '../utilities/plurals';
import { clsx } from '../utils';

const RESOURCES = ['people', 'planets', 'starships'] as const;
type Resource = (typeof RESOURCES)[number];

interface SwapiItem {
    id: string;
    name: string;
    title?: string;
    age?: string;
    climate?: string;
    model?: string;
    hair_color?: string;
    [key: string]: unknown;
}

export default function SwapiDemo() {
    const [activeResource, setActiveResource] = useState<Resource>('people');
    const [prevResource, setPrevResource] = useState<Resource | null>(null);

    const basket = useBasket();
    const { api, views, helpers } = basket;

    const {
        data: items = [],
        isLoading,
        error,
    } = useQuery<SwapiItem[], Error>({
        queryKey: ['swapi', activeResource],
        queryFn: async () => {
            const res = await fetch(`https://swapi.dev/api/${activeResource}/`);
            if (!res.ok) throw new Error('Failed to fetch');
            const json = await res.json();
            return (json.results || []).map(
                (item: Record<string, unknown>, idx: number) => ({
                    ...item,
                    name: item?.name ?? '-',
                    isFavorite: false,
                    id: `${activeResource}-${idx}`,
                }),
            );
        },
    });

    useEffect(() => {
        if (isLoading || items === undefined || prevResource === activeResource)
            return;
        api.addOptions(activeResource, items);
        setPrevResource(activeResource);
    }, [items, isLoading, api, activeResource, prevResource]);

    const onToggleItem = (item: SwapiItem) => {
        onToggleAdded(item.id);
        api.toggle(item.id);
    };
    const pluralizeSelections = pluralize('selection');

    const characterHelpers = useTanstackQuery({
        queryKey: ['swapi', activeResource],
    });

    const onToggleAdded = (id: string) => {
        console.log({ id, characterHelpers });
        characterHelpers.updateDataItem<SwapiItem[]>(
            (char) => char.id === id,
            (char) => ({ ...char, isFavorite: !char.isFavorite }),
        );
    };
    // const availableGroups = helpers.availableGroups();
    // const hasPeople = helpers.availableItemsInGroup('people');
    // const hasPlanets = helpers.availableItemsInGroup('planets');
    // const hasStarships = helpers.availableItemsInGroup('starships');

    // const payload = helpers.export((rec) => ({
    //     section: rec.group,
    //     columnId: rec.item.id,
    //     label: rec.item.name ?? '',
    // }));
    //
    //

    return (
        <>
            <Font.Bold size="lg">
                Load Options{' '}
                <Font.Bold
                    size="lg"
                    component="span"
                    dangerousColor="var(--positive)"
                >
                    {RESOURCES.length}
                </Font.Bold>
            </Font.Bold>
            <br />
            <Toolbar
                label="pick from resources"
                dangerous={{ gap: 'var(--gap-1)' }}
            >
                {RESOURCES.map((resource) => (
                    <Button
                        key={resource}
                        onClick={() => setActiveResource(resource)}
                        isActive={activeResource === resource}
                    >
                        {resource.charAt(0).toUpperCase() + resource.slice(1)}
                    </Button>
                ))}
            </Toolbar>
            <br />
            <Font.Bold size="lg">
                Add options{' '}
                <Font.Bold
                    size="lg"
                    component="span"
                    dangerousColor="var(--positive)"
                >
                    {items.length}
                </Font.Bold>
            </Font.Bold>
            <br />

            <Group.Row
                flexWrap="wrap"
                gap="var(--gap-3)"
                dangerous={{
                    padding: 'var(--gap-3)',
                }}
                className="theme-transparent"
            >
                {isLoading && <Icon.LoadingBar />}
                {error && (
                    <Alert mood="negative">
                        <Font> Error loading items</Font>
                    </Alert>
                )}
                {items.length === 0 && !isLoading && (
                    <Alert>
                        <Font> No items found</Font>
                    </Alert>
                )}

                {items.map((item, index) => {
                    const isInBasket =
                        helpers.isSelected(item.id) || item.isFavorite;

                    return (
                        <Group.Row
                            key={item.id}
                            className={clsx(
                                isInBasket && 'positive',
                                'theme-transparent',
                            )}
                            dangerous={{
                                padding: '0 0 0 var(--gap-1)',
                                backgroundColor: index % 2 ? '#aaa' : '#ccc',
                                alignItems: 'center',
                            }}
                        >
                            <Font>{item?.name ?? ''}</Font>
                            <Button
                                onClick={() => onToggleItem(item)}
                                isActive={isInBasket as boolean}
                            >
                                {isInBasket ? (
                                    <Icon.X size={22} />
                                ) : (
                                    <Icon.Add size={22} />
                                )}
                            </Button>
                        </Group.Row>
                    );
                })}
            </Group.Row>

            <br />
            <Font.Bold size="lg">
                {pluralizeSelections(views.selectedIds.length)}{' '}
                <Font.Bold
                    size="lg"
                    component="span"
                    dangerousColor="var(--positive)"
                >
                    {views.selectedIds.length}{' '}
                </Font.Bold>
            </Font.Bold>
            <br />

            <Group.Row flexWrap="wrap" gap="var(--gap-3)">
                {views.selectedIds.length === 0 ? (
                    <Font>Add items to your basket</Font>
                ) : (
                    views.flattened.map((item, index) => (
                        <Group.Row
                            key={item.id}
                            className={clsx('theme-transparent')}
                            dangerous={{
                                padding: '0 0 0 var(--gap-1)',
                                backgroundColor: index % 2 ? '#aaa' : '#ccc',
                                alignItems: 'center',
                            }}
                        >
                            <Font clamp={1}> {item.name ?? ''}</Font>
                            <Button onClick={() => api.remove([item.id])}>
                                <Icon.X size={22} />
                            </Button>
                        </Group.Row>
                    ))
                )}
            </Group.Row>
            <br />

            <Font.Bold size="lg">
                Selections grouped
                <Font.Bold
                    size="lg"
                    component="span"
                    dangerousColor="var(--positive)"
                >
                    {RESOURCES.length}
                </Font.Bold>
            </Font.Bold>
            <br />

            <Group.Col dangerous={{ maxWidth: '300px' }}>
                {Object.entries(views.countsByGroup).map(
                    ([group, count], index) =>
                        count > 0 ? (
                            <Group.Row
                                key={group}
                                className={clsx('theme-transparent')}
                                dangerous={{
                                    padding: 'var(--px)',
                                    backgroundColor:
                                        index % 2 ? '#aaa' : '#ccc',
                                    alignItems: 'center',
                                }}
                            >
                                <Font>{group}</Font>
                                <Font.Bold>
                                    {count}/{views.selectedIds.length}
                                </Font.Bold>
                            </Group.Row>
                        ) : null,
                )}
            </Group.Col>
            <br />

            {views.selectedIds.length > 0 && (
                <Button onClick={() => api.clear()}>Clear All</Button>
            )}
            <br />
        </>
    );
}
