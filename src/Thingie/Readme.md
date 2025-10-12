## Thingie for Reactjs

A common pattern (for me) has been some sort of list / tabular data from the user can select some of them.

The abstraction is a `Thingie`, specifically a factory that creates **ContextProvider** and **useSelection** to keep things friendly & tidy.

### Example A

```tsx
interface Stock {
    code: string;
    label: string;
}

const { Thingie:ListProvider, useSelection } = createThingie<Stock>("MyStockThingie");

const TECH_STOCKS = [
    { code: 'AAPL', id: '0000' },
    { code: 'MSFT', id: '1111' },
    { code: 'GOOG', id: '2222' },
    { code: 'AMZN', id: '3333' },
    { code: 'TSLA', id: '4444' },
    { code: 'NVDA', id: '5555' },
    { code: 'META', id: '6666' },
];

const App = () => {
    return (
        <ListProvider
          items={TECH_STOCKS}
          keySelector={(s) => s.code}
          initialSelectedKeys={['AAPL']}
        >
            <SomeChild />
        </ListProvider>
    )
}

// <SomeChild/>

const api = useSelection();

return (
    <>
        <div style={{ display: 'grid', gap: 6 }}>
            {api.items.map((s) => (
                <label key={s.id}>
                    <input
                        type="checkbox"
                        checked={api.isSelected(s)}
                        onChange={() => api.toggle(s)}
                    />
                    {s.code}
                </label>
            ))}
        </div>

        <button onClick={() => api.exportSelected())}>
            Export
        </button>
        <button onClick={() => api.clear()}>
            Clear
        </button>
    </>
);
```

### Example B

```tsx
export type Person = { id: number; name: string; email?: string; age?: number };

const { Thingie, useSelection } = createThingie<Person>(
    'ThingiePeopleSelection',
);

const columns: Column<Person>[] = [
    { field: 'name' },
    { field: 'email', render: (v) => <strong>{(v as string)[0]}</strong> },
    { field: 'age' },
];

const data = [
    { id: 1, name: 'A', email: 'a@x', age: 20 },
    { id: 2, name: 'B', email: 'b@x', age: 30 },
    { id: 3, name: 'Pol', email: 'b@x', age: 43 },
];

const App = () => {
    return (
        <Thingie
            items={data}
            keySelector={(s) => s.name}
            initialSelectedKeys={['Pol']}
        >
            <SomeChild />
        </Thingie>
    );
};

function SomeChild() {
    const api = useSelection();
    const selection = api.exportSelected();
    return (
        <>
            <p>{api.selectedCount}</p>
            <Rows
                columns={columns}
                gridTemplateColumns="2fr .5fr .25fr"
                rows={data}
                label="People"
                api={api}
            />
            <p>
                {selection.map((it) => (
                    <span key={it.id}>{it.name}</span>
                ))}
            </p>
        </>
    );
}
```

### Example C

LocalStorage can be `Thingified`, a factory that creates **useGet** and **useSet** to keep things friendly & tidy.

```tsx
const IS_BACK_KEY = 'returning-visitor';
const { useGet, useSet } = createLocalStorageHooks<'yes' | 'no' | null>(
    IS_BACK_KEY,
    {
        defaultValue: 'no',
    },
);

const { data: displayModeStorage, isLoading } = useGet();
const { mutate } = useSet();

const setDisplayMode = (mode: 'yes' | 'no') => {
    mutate(mode, {
        onSuccess: () => {
            // invalidate is handled by default onSuccess
        },
    });
};
```

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible:
> buildings, furniture, drinking glasses may well be consumer items that
> we can destroy without regret after they have served for some short or
> long period, but while we use them we expect them to full fill their role and serve us perfectly, so perfectly that we can also derive aesthetic
> enjoyment from observing them in use.

Erik Gunnar Asplund on **Swedish Grace**.
