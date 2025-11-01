```tsx
const hoverTooltip = useTooltip({ trigger: 'hover' });
const clickTooltip = useTooltip({ trigger: 'click' });
const customTimeout = useTooltip({ trigger: 'click', timeout: 5000 });
const noTimeout = useTooltip({ trigger: 'click', timeout: 0 });

return (
    <>
        <Button {...hoverTooltip.getProps('This tooltip appears on hover!')}>
            Hover me
        </Button>

        <Button {...clickTooltip.getProps('Auto-hides after 3 seconds!')}>
            Click me
        </Button>

        <Button {...customTimeout.getProps('Auto-hides after 5 seconds!')}>
            5 second tooltip
        </Button>

        <Button {...noTimeout.getProps('Click outside to dismiss!')}>
            Manual dismiss
        </Button>
    </>
);
```
