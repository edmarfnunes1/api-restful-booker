const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://restful-booker.herokuapp.com",
    watchForFileChanges: false,
    defaultCommandTimeout: 15000,
    reporter: "junit",
    reporterOptions: {
      mochaFile: "reports/results-[hash].xml",
      toConsole: true
    },
    setupNodeEvents(on, config) {
      return config;
    }
  }
});
