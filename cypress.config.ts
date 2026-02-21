import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://automation.testathon.hu/',
    supportFile: false,
    specPattern: "cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {

    },
  },
});