/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/react-thingie/',
    test: {
        // use describe/it/expect without imports
        globals: true,
        // or 'jsdom' for DOM/react tests
        environment: 'node',
        include: ['src/**/*.test.{ts,tsx}'],
    },
});
