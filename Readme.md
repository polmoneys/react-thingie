**Work in progress** [Quick demo](https://polmoneys.github.io/react-thingie)

## Thingies for Reactjs

My work involves complex UI in React, this is how I roll for now.
We have `Dumb (n)`, `Smart-ish (7)` and `Inspired (3)`.

`Arigato gozaimas` to [React Aria](https://react-spectrum.adobe.com/react-aria/FocusRing.html),
[Tanstack-query](https://tanstack.com/query/docs) and
[Nuqs](https://github.com/47ng/nuqs) for being such a joy to work with.

### Inspired (3)

**User does** and we may need to parachute them into safety or `useLifeboat` meant to save an outgoing interaction to recover from **things that happen to users** as well as random data cache for intermediate operations. Stored on indexDB and powered by Tanstack-query, looks like:

```ts
const {
    lifeboats,
    getLifeboat,
    create,
    update,
    remove,
    removeAll,
    isCreating,
} = useLifeboats();
```

Grouping UI is complex. `<GridTemplateColumns>` encourages teams to nest less markup and use semantic wrappers while providing **responsive sugar**.

Previous set value **carry on** so no need to declare all breakpoints all the time.

```tsx
return (
    <>
        <GridTemplateColumns
            component="main"
            gridTemplateColumns={{
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
            }}
            gap={{ xs: 'var(--gap-2)', md: 'var(--gap-4)' }}
        >
            <Card />
            <Card />
            <Card />
        </GridTemplateColumns>

        <GridTemplateColumns
            component="form"
            gridTemplateColumns={{
                xs: '1fr',
                md: '100px 1fr',
            }}
            gap={{ xs: 'var(--gap-2)' }}
        >
            <Label />
            <Input />
        </GridTemplateColumns>
    </>
);
```

Breakpoints can be updated on `index.module.css`, for reference:

| BP  | px   |
| --- | ---- |
| xs  | 600  |
| md  | 960  |
| lg  | 1280 |
| xl  | 1920 |

(...)

### Smart-ish (7)

(...)

### Dumb (n)

(...)

### Lore

I do not write much about code, last time was [7 years ago](https://polmoneys.github.io/). Funny the subject is kinda of the same. At that time I was creating complex gamified experiences, lots of **Art and Visuals** made of **CSS** at a time where `IE8` was fading out, slowly. These past few years I've been working with financial data, dashboards, complex tables and search filters and what not for a classic Swiss Private Bank.

Attempt 27392794472 to create a 'Design System'. Previous work, [Boost](https://github.com/polmoneys/boost), [Apoteosis](https://www.apotheosis.party/), [Hug component](https://github.com/polmoneys/Hug)...

### Inspiration 💐

> Our requirements are more modest but at the same time more responsible:
> buildings, furniture, drinking glasses may well be consumer items that
> we can destroy without regret after they have served for some short or
> long period, but while we use them we expect them to full fill their role and serve us perfectly, so perfectly that we can also derive aesthetic
> enjoyment from observing them in use.

Erik Gunnar Asplund on **Swedish Grace**.

**Work in progress** [Quick demo](https://polmoneys.github.io/react-thingie)

```

```
