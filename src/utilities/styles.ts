/*

// chain
style('#app')
  .color('#fff')
  .backgroundColor('#000')
  .filter('blur(2px)');

// set a custom property and continue chaining
style('#app')
  .setProperty('--accent', 'hotpink')
  .color('var(--accent)');

// get a value
const currentColor = style('#app').color();


*/
type ScopedProps = 'color' | 'backgroundColor' | 'filter';

type PropFn = {
    (value: string): ChainableStyle;
    (): string;
};

export type ChainableStyle = {
    [K in ScopedProps]: PropFn;
} & {
    setProperty(name: string, value: string): ChainableStyle;
};

export function style(selector: string): ChainableStyle {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) throw new Error(`No element found for selector "${selector}"`);

    const target = el.style;
    // will be set right after handler creation
    let proxyRef = undefined as unknown as ChainableStyle;

    const handler: ProxyHandler<CSSStyleDeclaration> = {
        get(t, prop) {
            // preserve default behavior for symbols (inspections, etc.)
            if (typeof prop === 'symbol') return Reflect.get(t, prop);

            if (prop === 'setProperty') {
                return (name: string, value: string) => {
                    t.setProperty(name, value);
                    return proxyRef;
                };
            }

            const key = prop as ScopedProps;
            if (
                key === 'color' ||
                key === 'backgroundColor' ||
                key === 'filter'
            ) {
                const fn = (value?: string) => {
                    if (arguments.length === 0) {
                        // getter
                        return (
                            (t as unknown as Record<string, string>)[key] || ''
                        );
                    }
                    // setter
                    (t as unknown as any)[key] = value;
                    return proxyRef;
                };
                return fn;
            }

            return undefined;
        },
    };

    proxyRef = new Proxy(target, handler) as unknown as ChainableStyle;
    return proxyRef;
}
