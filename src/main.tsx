import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import App from './App.tsx';

import './system.css';
import './CSS/button.css';
import './CSS/checkbox.css';
import './CSS/colors.css';
import './CSS/ratio.css';
import './CSS/utils.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
