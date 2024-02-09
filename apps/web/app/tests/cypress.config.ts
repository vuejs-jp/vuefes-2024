import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: 'app/tests/cypress/support/e2e.ts',
    specPattern: 'app/tests/cypress/e2e/*.cy.ts',
  },
  downloadsFolder: 'app/tests/cypress/downloads',
  fixturesFolder: 'app/tests/cypress/fixtures',
  screenshotsFolder: 'app/tests/cypress/screenshots',
  videosFolder: 'app/tests/cypress/videos',
});
