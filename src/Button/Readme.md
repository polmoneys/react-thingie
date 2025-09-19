```tsx

<Button.Group direction="vertical">
    {({ active, setActive }) => {
        return (
            <Fragment>
                <Button isActive={active===0} onClick={() => setActive(0)}>
                    0%
                </Button>
                <ButtonisActive={active===1} onClick={() => setActive(1)}>
                    50%
                </Button>
                <Button isActive={active===2} onClick={() => setActive(2)}>
                    100%
                </Button>
            </Fragment>
        );
    }}
</Button.Group>

```
