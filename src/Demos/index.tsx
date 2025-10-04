import {
    type ComponentType,
    lazy,
    type LazyExoticComponent,
    Suspense,
    useEffect,
    useMemo,
} from 'react';

import Alert from '../Dumb/Alert';
import Font from '../Dumb/Font';
import Icon from '../Dumb/Icon';

export type DemosLabels =
    | 'AutoCompLite'
    | 'Card'
    | 'DatePicker'
    | 'Dialog'
    | 'Icon'
    | 'List'
    | 'Menu'
    | 'Popover'
    | 'Portal'
    | 'Radio'
    | 'Stream'
    | 'Table';

const DEMO_IMPORTERS: Record<
    DemosLabels,
    () => Promise<{ default: ComponentType<any> }>
> = {
    AutoCompLite: () =>
        import(/* webpackChunkName: "demo-autocomplite" */ './Multiple'),
    Card: () => import(/* webpackChunkName: "demo-card" */ './Cards'),
    DatePicker: () =>
        import(/* webpackChunkName: "demo-picker" */ './DatePicker'),
    Dialog: () => import(/* webpackChunkName: "demo-dialog" */ './Dialogs'),
    Icon: () => import(/* webpackChunkName: "demo-icon" */ './Icons'),
    List: () => import(/* webpackChunkName: "demo-list" */ './List'),
    Menu: () => import(/* webpackChunkName: "demo-menu" */ './Menu'),
    Popover: () => import(/* webpackChunkName: "demo-popover" */ './Popover'),
    Portal: () => import(/* webpackChunkName: "demo-portal" */ './Portals'),
    Radio: () => import(/* webpackChunkName: "demo-radio" */ './Radios'),
    Stream: () => import(/* webpackChunkName: "demo-stream" */ './Stream'),
    Table: () => import(/* webpackChunkName: "demo-table" */ './Tables'),
};

// MODULE-LEVEL CACHE: stable Lazy components across renders
const lazyCache = new Map<
    DemosLabels,
    LazyExoticComponent<ComponentType<any>> & { preload?: () => Promise<void> }
>();

// helper to create a lazy component with a preload and cache it
function getLazyDemo(name: DemosLabels) {
    if (lazyCache.has(name)) return lazyCache.get(name)!;

    const importer = DEMO_IMPORTERS[name];
    if (!importer) return null;

    const Lazy = lazy(importer) as LazyExoticComponent<ComponentType<any>> & {
        preload?: () => Promise<void>;
    };

    // attach a preload to allow prefetching
    Lazy.preload = () => importer().then(() => undefined);

    lazyCache.set(name, Lazy);
    return Lazy;
}

type DemoRendererProps = {
    demos: string[];
    preload?: boolean;
};

export default function DemoRenderer({
    demos,
    preload = false,
}: DemoRendererProps) {
    // build a stable list of components (doesn't recreate lazy wrappers)
    const lazyComponents = useMemo(() => {
        return demos.map((name) => {
            const asLabel = name as DemosLabels;
            const Component = getLazyDemo(asLabel);
            return { name, Component };
        });
    }, [demos]);

    // optionally start preloads as early as possible
    useEffect(() => {
        if (!preload) return;
        for (const { name } of lazyComponents) {
            const asLabel = name as DemosLabels;
            const L = getLazyDemo(asLabel);
            if (L && typeof (L as any).preload === 'function') {
                (L as any).preload();
            }
        }
    }, [lazyComponents, preload]);

    return (
        <>
            {lazyComponents.map(({ name, Component }) =>
                Component ? (
                    <Suspense
                        key={name}
                        fallback={
                            <Alert mood="positive" isPending>
                                <Icon.Loading />
                            </Alert>
                        }
                    >
                        <Component />
                    </Suspense>
                ) : (
                    <Alert key={name} mood="negative">
                        <Font>Unknown demo: {name}</Font>
                    </Alert>
                ),
            )}
        </>
    );
}
