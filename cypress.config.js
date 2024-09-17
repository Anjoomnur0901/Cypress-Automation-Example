const { defineConfig } = require("cypress");
const {nanoid} = require("nanoid");
module.exports = defineConfig({
  projectId: 'hxaspe',
  reporter: 'cypress-mochawesome-reporter',
  viewportWidth: 1920,
  viewportHeight: 1200, // to avoid scrolling issue
  video: true,
  e2e: {
    defaultCommandTimeout: 60000,
    testIsolation: false,
    baseUrl: 'http://localhost:4200',
    env: {
      'nanoId': nanoid(),
      'tolerance': 0.01,
    },
    experimentalMemoryManagement: true,
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log(
          'launching browser %s is headless? %s',
          browser.name,
          browser.isHeadless,
        )

        // the browser width and height we want to get
        // our screenshots and videos will be of that resolution
        const width = 1920
        const height = 1080

        console.log('setting the browser window size to %d x %d', width, height)

        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push(`--window-size=${width},${height}`)

          // force screen to be non-retina and just use our given resolution
          launchOptions.args.push('--force-device-scale-factor=1')
        }

        if (browser.name === 'electron' && browser.isHeadless) {
          // might not work on CI for some reason
          launchOptions.preferences.width = width
          launchOptions.preferences.height = height
        }

        if (browser.name === 'firefox' && browser.isHeadless) {
          launchOptions.args.push(`--width=${width}`)
          launchOptions.args.push(`--height=${height}`)
        }

        // IMPORTANT: return the updated browser launch options
        return launchOptions
      })
      on('task', {
        log(message) {
          console.log(message);
          return null; // Cypress requires tasks to return a value
        }
      });
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  retries: {
    runMode: 1,
    openMode: 1,
  }
});

