import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://localhost:4200', // URL de tu aplicación Angular
  },
});