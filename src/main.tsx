import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { createRoot } from 'react-dom/client';

import { queryClient } from './utilities/queryClient.ts';
import App from './App.tsx';

import './CSS/index.css';
import './CSS/colors.css';
import './CSS/utils.css';
import './CSS/react-aria.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <NuqsAdapter>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </NuqsAdapter>
    </StrictMode>,
);
