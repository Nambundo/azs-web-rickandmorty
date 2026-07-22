import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://azs-web-rickandmorty-kappa.vercel.app/',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 8000,
  },
});
