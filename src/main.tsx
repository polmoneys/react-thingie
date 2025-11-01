import { StrictMode } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { createRoot } from 'react-dom/client';

import TooltipProvider from './Dumb/Output/index.tsx';
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
                <TooltipProvider>
                    <App />
                </TooltipProvider>
            </QueryClientProvider>
        </NuqsAdapter>
    </StrictMode>,
);
