import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { headersFile } from '@vanamalix/ui/vite';
import { headers } from './headers.config.ts';

export default defineConfig({
  plugins: [react(), headersFile(headers)],
  build: {
    target: ['es2020', 'safari15'],
    modulePreload: { polyfill: false },
    assetsInlineLimit: 0,
    sourcemap: false,
  },
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    setupFiles: ['@vanamalix/testing/network-guard'],
  },
});
