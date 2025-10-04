import { useState } from 'react';

import AutocompLiteMultiple from '../Dumb/Autocomplete/Multiple';

type StateItem = { id: string; name: string; region?: string };

const states: StateItem[] = [
    { id: 'ca', name: 'California' },
    { id: 'ny', name: 'New York' },
    { id: 'al', name: 'Alaska' },
    { id: 'mi', name: 'Missouri' },
];

export default function DemoMultiple() {
    const [selected, setSelected] = useState<StateItem[]>([]);

    return (
        <>
            <AutocompLiteMultiple
                options={states}
                value={selected}
                onChange={setSelected}
                limit={3}
                getItemLabel={(item) => item.name}
                match={(item, query) =>
                    item.name.toLowerCase().startsWith(query.toLowerCase())
                }
            />
            <br />
        </>
    );
}
