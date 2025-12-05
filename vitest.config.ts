import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@core': path.resolve(__dirname, 'src/app/core'),
      '@shared': path.resolve(__dirname, 'src/app/shared'),
      '@features': path.resolve(__dirname, 'src/app/features'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    exclude: ['src/app/app.spec.ts'],
    passWithNoTests: true,
  },
});
