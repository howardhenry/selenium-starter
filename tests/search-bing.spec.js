const { By } = require('selenium-webdriver');
const TestDriver = require('../utils/test-driver');

describe('Search Bing', () => {
  let testDriver;
  const data = {
    baseUrl: 'https://bing.com',
    searchString: 'Toronto Weather'
  };

  beforeAll(async () => {
    testDriver = await TestDriver.create();
  });

  afterAll(() => {
    testDriver.quit();
  });

  it('should search Bing for the Weather in Toronto', async () => {
    await testDriver
      .get(data.baseUrl);

    await testDriver
      .findElement(By.css('.b_searchbox'))
      .sendKeys(data.searchString);

    await testDriver
      .findElement(By.css('.b_searchboxSubmit'))
      .click();
  });
});
