Throw a `Lifeboat` to the user by 'saving' critical interactions.

```ts
function MyComponent() {
    const {
        lifeboats,
        getLifeboat,
        create,
        update,
        remove,
        removeAll,
        isCreating,
    } = useLifeboats();

    await create(
        'draft-1',
        JSON.stringify({ title: 'My draft', content: 'Some text' }),
    );

    await update(
        'draft-1',
        JSON.stringify({ title: 'Updated draft', content: 'New text' }),
    );

    await create('critical-data', 'important value', true);
    await remove('draft-1');

    const specificLifeboat = getLifeboat('draft-1');

    const parsedValue = specificLifeboat
        ? JSON.parse(specificLifeboat.value as string)
        : null;

    const handleClearAll = async () => {
        await removeAll();
    };

    const specificLifeboat = getLifeboat('draft-1');
}
```
