const { Builder, Capabilities } = require('selenium-webdriver');

const { SELENIUM_URL: seleniumUrl } = process.env;

class TestDriver {
  static async create() {
    const testDriver = new Builder()
      .forBrowser('chrome')
      .withCapabilities(Capabilities.chrome())
      .usingServer(seleniumUrl)
      .build();

    return testDriver;
  }
}

module.exports = TestDriver;
