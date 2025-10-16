import { useMemo, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import Alert from '../Dumb/Alert';
import Button from '../Dumb/Button';
import Font from '../Dumb/Font';
import Group from '../Dumb/Group';
import Icon from '../Dumb/Icon';
import TextInputLabel from '../Dumb/InputText';
import GridTemplateColumns from '../Inspired/GridTemplateColumns';
import useSlidingWindow from '../utilities/useSlidingWindow';
import { clsx } from '../utils';

interface StarWarsCharacter {
    name: string;
    height: string;
    mass: string;
    birth_year: string;
    gender: string;
    url: string;
}

async function fetchAllCharacters(): Promise<StarWarsCharacter[]> {
    const characters: StarWarsCharacter[] = [];
    let page = 1;

    while (page <= 9) {
        // SWAPI has 9 pages
        const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
        const data = await res.json();
        characters.push(...data.results);
        if (!data.next) break;
        page++;
    }
    return characters;
}
export default function SlidingWindowDemo() {
    const [searchTerm, setSearchTerm] = useState('');

    const { data: characters = [], isLoading } = useQuery({
        queryKey: ['starwars', 'characters'],
        queryFn: fetchAllCharacters,
    });

    const filteredCharacters = useMemo(() => {
        if (!searchTerm) return characters;
        return characters.filter((char) =>
            char.name.toLowerCase().includes(searchTerm.toLowerCase()),
        );
    }, [characters, searchTerm]);

    const {
        visibleItems,
        containerProps,
        innerProps,
        scrollToIndex,
        currentStartIndex,
        currentEndIndex,
        isAddingItems,
    } = useSlidingWindow({
        items: filteredCharacters,
        itemHeight: 80,
        maxRenderedItems: 20,
        scrollThreshold: 5,
    });

    if (isLoading) {
        return (
            <Alert>
                <Group.Col>
                    <Font size="lg">Loading the galaxy far, far away...</Font>
                    <br />
                    <Icon.LoadingBar />{' '}
                </Group.Col>
            </Alert>
        );
    }

    return (
        <>
            <div style={{ minHeight: '100vh' }}>
                <GridTemplateColumns
                    gridTemplateColumns={{ xs: '1fr', md: '1fr .75fr' }}
                    gap={{ xs: 'var(--gap-2)' }}
                >
                    <TextInputLabel
                        label=""
                        id="test-search"
                        placeholder="Search characters..."
                        value={searchTerm}
                        onChange={(v) => setSearchTerm(v)}
                        classNames={{ input: 'theme-inset' }}
                    />

                    <div>
                        <Button onClick={() => scrollToIndex(0)}>
                            Scroll to Top
                        </Button>
                        <Button
                            onClick={() =>
                                scrollToIndex(
                                    Math.floor(filteredCharacters.length / 2),
                                )
                            }
                        >
                            Scroll to Middle
                        </Button>
                        <Button
                            onClick={() =>
                                scrollToIndex(filteredCharacters.length - 1)
                            }
                        >
                            Scroll to Bottom
                        </Button>
                    </div>
                </GridTemplateColumns>
                <br />

                <div
                    {...containerProps}
                    className={clsx(
                        'slidind-window-container',
                        isAddingItems && 'noise-scroll',
                    )}
                >
                    <div {...innerProps}>
                        {visibleItems.map(({ item, index, top }) => (
                            <Group.Row
                                key={index}
                                dangerous={{
                                    flexWrap: 'wrap',
                                    placeContent: 'center',
                                    position: 'absolute',
                                    top: `${top}px`,
                                    left: 0,
                                    right: 0,
                                    height: '80px',
                                    padding: 'var(--px)',
                                    backgroundColor:
                                        index % 2 ? '#aaa' : '#ccc',
                                }}
                            >
                                <Group.Col>
                                    <Font>
                                        {index + 1}. {item.name}
                                    </Font>
                                    <Font>
                                        Height: {item.height}cm • Mass:{' '}
                                        {item.mass}kg • Born: {item.birth_year}
                                    </Font>
                                </Group.Col>
                                <Button
                                    className="ml-a"
                                    dangerous={{ alignSelf: 'center' }}
                                    onClick={() =>
                                        alert(`Clicked ${item.name}`)
                                    }
                                >
                                    View
                                </Button>
                            </Group.Row>
                        ))}
                    </div>
                </div>

                <br />
                <Alert>
                    <Font>
                        Rendering items {currentStartIndex} - {currentEndIndex}{' '}
                        of {filteredCharacters.length}
                    </Font>
                    <Font>Total Items: {filteredCharacters.length}</Font>
                    <Font>Rendered Items: {visibleItems.length}</Font>
                    <Font>
                        Window: [{currentStartIndex}, {currentEndIndex}]
                    </Font>
                    <Font>
                        Memory: Only rendering{' '}
                        {Math.min(42, filteredCharacters.length)} items at a
                        time
                    </Font>
                </Alert>
            </div>
        </>
    );
}
