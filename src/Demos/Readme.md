```tsx
async function openEditor() {
    const { Editor } = await import('./heavy/editor');
    Editor.open();
}

<button onClick={openEditor}>Open Editor</button>;

// prefetch on hover to reduce perceived latency
const preloadDashboard = () => import('./pages/Dashboard');

<Link onMouseEnter={preloadDashboard} to="/dashboard">
    Dashboard
</Link>;
```
