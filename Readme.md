**Work in progress**

## Thingies for Reactjs

My work involves complex UI in React, this is how I roll for now.

### Patterns

A piece of UI is a group, small ones should be done with `<Slots>` / `<GridTemplateColumns>` or `<Rows>`.

A bunch of Slots becomes a `<List>` or `<Table>` that can be selected by **createThingie** that returns `<ContextProvider>` and `useSelection` hook. [Read More](/src/Thingie/Readme.md) about Thingie.

URLS are **QUEEN**

### Slots / GridTemplateColumns

Children with Start/End slots vs. Breakpoint aware gridTemplateColumns, gap and padding.

```tsx
{
    items?.map((item, pos) => (
        <Slot
            key={item.id}
            gradient={`${!api.isSelected(item) ? 'var(--accent)' : 'var(--red)'} 0, ${!api.isSelected(item) ? 'var(--accent)' : 'var(--red)'} 60px, var(--white) 60px, var(--white) calc(100% - 132px), var(--nemesis) calc(100% - 132px),var(--nemesis) 100%`}
            start={<Shape sides={api.isSelected(item) ? 4 : 22} size={22} />}
            startWidth="60px"
            end={
                <Button onClick={() => api.toggle(item)}>
                    {api.isSelected(item) ? 'Remove' : 'Add'}
                </Button>
            }
            endWidth="130px"
            dangerous={{
                marginBottom:
                    (api.items ?? []).length - 1 === pos ? 0 : 'var(--gap-1)',
            }}
        >
            <Font.Bold
                px="var(--gap-3)"
                clamp={1}
                onClick={() => api.toggle(item)}
            >
                {item.code}
            </Font.Bold>
        </Slot>
    ));
}
```

Them group well as `<List/>`.

### Rows

Rows with `<Header>`

```tsx
<Rows
    columns={COLUMNS}
    gridTemplateColumns="2fr .5fr .25fr"
    rows={USERS}
    label="users of imaginary app"
    api={api}
    selectedBackgroundColor="var(--accent)"
/>
```

Them group well as `<Table/>`

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible:
> buildings, furniture, drinking glasses may well be consumer items that
> we can destroy without regret after they have served for some short or
> long period, but while we use them we expect them to full fill their role and serve us perfectly, so perfectly that we can also derive aesthetic
> enjoyment from observing them in use.

Erik Gunnar Asplund on **Swedish Grace**.
