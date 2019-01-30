const { By } = require('selenium-webdriver');
const errorHandler = require('../../utils/error-handler');
const logger = require('../../utils/logger');

const search = (driver) => {
  const data = {
    baseUrl: 'https://bing.com',
    searchString: 'Toronto Weather'
  };

  driver
    .get(data.baseUrl)
    .then(() => logger.info('---------------------------------------------------------------'))
    .then(() => logger.info('Starting test: Search > Bing'))
    .catch(errorHandler.logAndTerminate);

  driver
    .findElement(By.css('.b_searchbox'))
    .sendKeys(data.searchString)
    .then(() => logger.info(`Set search string to ${data.searchString}`))
    .catch(errorHandler.logAndTerminate);

  driver
    .findElement(By.css('.b_searchboxSubmit'))
    .click()
    .then(() => logger.info('Clicked "I\'m feeling lucky"'))
    .then(() => logger.info('Clicked "I\'m feeling lucky"'))
    .catch(errorHandler.logAndTerminate);
};

module.exports = search;
