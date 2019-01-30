const seleniumWebdriver = require('selenium-webdriver');
const searchGoogle = require('./suites/search');
const errorHandler = require('./utils/error-handler');

// Run tests
const browser = 'chrome';
const driver = new seleniumWebdriver.Builder().forBrowser(browser).build();
searchGoogle(driver);

// Handle printing test status reporting before exiting application
process.on('beforeExit', (errorCode) => errorHandler.onProcessBeforeExit(errorCode, driver));
process.on('uncaughtException', (error) => errorHandler.logAndTerminate(error));
