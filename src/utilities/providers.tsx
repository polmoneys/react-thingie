import type { ComponentType, ReactNode } from 'react';

// const PageProvidersAuth = combineProviders(SSRProvider, AuthProvider);

export function combineProviders(
    ...providers: ComponentType<{ children: ReactNode }>[]
) {
    return function CombinedProviders({ children }: { children: ReactNode }) {
        return providers.reduceRight(
            (acc, Provider) => <Provider>{acc}</Provider>,
            children,
        );
    };
}
