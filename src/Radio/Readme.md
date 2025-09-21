```tsx
<Radio
    name="rating"
    defaultChecked={false}
    onChange={(value) => {
        console.log({ filter: 'rating', value }));
    }}>

   ({
        checked,
        radioLabel,
    }) => {
        const amount = matchLabelToHearts(radioLabel as Rating);
        // all
        if (amount === 0) {
            return (
                <Font
                    dangerousColor={
                        checked ? 'red' : 'var(--accent)'
                    }
                >
                    {capitalize(radioLabel)}
                </Font>
            );
        }
        return (
            <div>
                {[...Array(amount)].map((_, pos: number) => (
                    <Shape
                        key={`${pos}-${radioLabel}`}
                        stroke={
                            checked
                                ? 'red'
                                : 'var(--accent)'
                        }
                    />
                ))}
            </div>
        );
    }}
</Radio>
```
