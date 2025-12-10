const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",
    watchForFileChanges: false,
    defaultCommandTimeout: 15000,
    supportFile: "cypress/support/e2e.js",
    
    reporter: "junit",
    reporterOptions: {
      mochaFile: "reports/results.xml",
      toConsole: true
    },

    setupNodeEvents(on, config) {
      allureWriter(on, config);
      return config;
    }
  }
});
