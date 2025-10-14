Manage a basket of (grouped) items from many sources.

```tsx
const { api, views, helpers } = useBasket<MyCol>();

// when performance endpoint resolves:
api.addOptions('performance', [
    { id: 'p1', label: 'P1' },
    { id: 'p2', label: 'P2' },
]);

api.toggle('p1');
api.add(['p2', 'p3']);

views.flattened;
for (const [group, items] of views.grouped) {
    // render group header and items
}

const payload = helpers.export((rec) => ({
    group: rec.group,
    columnId: rec.item.id,
    title: rec.item.label,
}));
```
