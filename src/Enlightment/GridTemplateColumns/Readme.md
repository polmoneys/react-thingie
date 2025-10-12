`GridTemplateColumns` is my fav component ever <3

```tsx
// works for gap & padding too

<GridTemplateColumns
    gridTemplateColumns={{
        xs: '1fr',
        md: '1fr 1fr',
        lg: '1fr 1fr 1fr',
        xl: '1fr 1fr 1fr 1fr',
    }}
>
    {/* children */}
</GridTemplateColumns>
```
