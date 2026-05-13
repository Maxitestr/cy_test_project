const { defineConfig } = require("cypress")

module.exports = defineConfig({

  e2e: {
    baseUrl: 'https://www.mvideo.ru',
    specPattern: [
      "cypress/e2e/**/*.cy.js",
      "cypress/api/**/*.cy.js"
    ],
    viewportWidth: 1280,
    viewportHeight: 720,
    failOnStatusCode: true,
    setupNodeEvents(on, config) {
      const allureWriter = require('@shelex/cypress-allure-plugin/writer')
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--user-agent=Chrome/120.0.0.0 Safari/537.36')
          launchOptions.args.push('--disable-blink-features=AutomationControlled')
          launchOptions.args.push('--disable-features=ChromeWhatsNewUI')
          launchOptions.args.push('--disable-web-security')
        }
        return launchOptions
      })
      allureWriter(on, config)
      return config
    },
  },
  env: {
    allureReuseAfterSpec: true
  }
})
