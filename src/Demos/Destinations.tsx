import Alert from '../Dumb/Alert';
import AutocompLite from '../Dumb/AutocompLite';
import type { AutocompLiteOption } from '../Dumb/AutocompLite/interfaces';
import useAutocompleteDestination from '../Dumb/AutocompLite/useAutocomplite';
import Font from '../Dumb/Font';

const demoPlaces = [
    {
        id: 'paris',
        city: 'Paris',
        state: 'Île-de-France',
        country: 'France',
        continent: 'Europe',
    },
    {
        id: 'london',
        city: 'London',
        state: 'England',
        country: 'United Kingdom',
        continent: 'Europe',
    },
    {
        id: 'newyork',
        city: 'New York',
        state: 'New York',
        country: 'United States',
        continent: 'North America',
    },
    {
        id: 'tokyo',
        city: 'Tokyo',
        state: 'Tokyo',
        country: 'Japan',
        continent: 'Asia',
    },
    {
        id: 'rome',
        city: 'Rome',
        state: 'Lazio',
        country: 'Italy',
        continent: 'Europe',
    },
    {
        id: 'barcelona',
        city: 'Barcelona',
        state: 'Catalonia',
        country: 'Spain',
        continent: 'Europe',
    },
    {
        id: 'istanbul',
        city: 'Istanbul',
        state: 'Istanbul',
        country: 'Turkey',
        continent: 'Europe/Asia',
    },
    {
        id: 'dubai',
        city: 'Dubai',
        state: 'Dubai',
        country: 'United Arab Emirates',
        continent: 'Asia',
    },
    {
        id: 'bali',
        city: 'Denpasar',
        state: 'Bali',
        country: 'Indonesia',
        continent: 'Asia',
    },
    {
        id: 'singapore',
        city: 'Singapore',
        state: '',
        country: 'Singapore',
        continent: 'Asia',
    },
    {
        id: 'sydney',
        city: 'Sydney',
        state: 'New South Wales',
        country: 'Australia',
        continent: 'Oceania',
    },
    {
        id: 'amsterdam',
        city: 'Amsterdam',
        state: 'North Holland',
        country: 'Netherlands',
        continent: 'Europe',
    },
    {
        id: 'losangeles',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        continent: 'North America',
    },
    {
        id: 'bangkok',
        city: 'Bangkok',
        state: '',
        country: 'Thailand',
        continent: 'Asia',
    },
    {
        id: 'hongkong',
        city: 'Hong Kong',
        state: '',
        country: 'China SAR',
        continent: 'Asia',
    },
    {
        id: 'sanfrancisco',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        continent: 'North America',
    },
    {
        id: 'lisbon',
        city: 'Lisbon',
        state: '',
        country: 'Portugal',
        continent: 'Europe',
    },
    {
        id: 'prague',
        city: 'Prague',
        state: '',
        country: 'Czech Republic',
        continent: 'Europe',
    },
    {
        id: 'vienna',
        city: 'Vienna',
        state: '',
        country: 'Austria',
        continent: 'Europe',
    },
    {
        id: 'capetown',
        city: 'Cape Town',
        state: 'Western Cape',
        country: 'South Africa',
        continent: 'Africa',
    },
    {
        id: 'marrakech',
        city: 'Marrakech',
        state: '',
        country: 'Morocco',
        continent: 'Africa',
    },
    {
        id: 'rio',
        city: 'Rio de Janeiro',
        state: 'Rio de Janeiro',
        country: 'Brazil',
        continent: 'South America',
    },
    {
        id: 'delhi',
        city: 'Delhi',
        state: '',
        country: 'India',
        continent: 'Asia',
    },
    {
        id: 'seoul',
        city: 'Seoul',
        state: '',
        country: 'South Korea',
        continent: 'Asia',
    },
    {
        id: 'mexicocity',
        city: 'Mexico City',
        state: '',
        country: 'Mexico',
        continent: 'North America',
    },
];

// Example mapper for the demo shape (T = typeof demoPlaces[number])
const mapper = (p: (typeof demoPlaces)[number]): AutocompLiteOption => ({
    id: p.id,
    city: p.city,
    state: p.state || '',
    country: p.country,
    continent: p.continent,
    full: `${p.city}${p.state ? `, ${p.state}` : ''}, ${p.country}`,
});

export default function DemoDestinations() {
    const {
        selected,
        liveMessage,
        filteredOptions,
        toggleOption,
        query,
        setQuery,
        showPopover,
        setPopover,
    } = useAutocompleteDestination({
        places: demoPlaces,
        mapper,
        initialQuery: '',
        multi: true,
    });

    return (
        <>
            <AutocompLite
                placeholder="Search destinations"
                id="destinations-autcompLite"
                label="Go"
                toggleOption={toggleOption}
                options={filteredOptions}
                a11y={liveMessage ?? ''}
                query={query}
                setQuery={setQuery}
                selected={selected}
                onToggle={() => setPopover((prev) => !prev)}
                showPopover={showPopover}
            >
                {filteredOptions.length === 0 ? (
                    <Alert>
                        <Font>No destinations match</Font>
                    </Alert>
                ) : null}
            </AutocompLite>
        </>
    );
}
