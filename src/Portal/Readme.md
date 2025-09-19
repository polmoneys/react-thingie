## Portals

**serious insight** from jjenzz:

> When passing a component through a Portal
> it will not replace the children in the node you provide,
> it will append to it.

```tsx
const { PortalProvider, usePortal, Portal } = createPortal('Magic');
```

```css
[data-portal-fallback] {
}
```
