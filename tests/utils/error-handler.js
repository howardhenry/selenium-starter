const _ = require('lodash');
const logger = require('./logger');

const now = Date.now();

const onProcessBeforeExit = (exitCode, driver) => {
  const exitStatus = exitCode === 0 ? 'success' : 'error';
  const exitText = exitCode === 0 ? 'E2E tests successful' : 'E2E tests failed';

  const printTestStatusLogs = () => {
    logger.info('-----------------------------------------------------------------');
    logger[exitStatus](exitText);
    logger.info(`Finished in ${(Date.now() - now) / 1000} seconds`);

    process.exit(exitCode);
  };

  const driverSessionId = _.get(driver, 'session_.value_.id_');
  if (driverSessionId) {
    driver
      .quit()
      .then(() => printTestStatusLogs());
  } else if (!driver) {
    printTestStatusLogs();
  }
};

const logAndTerminate = (error, driver) => {
  logger.error(error);
  onProcessBeforeExit(1, driver);
};

module.exports = {
  onProcessBeforeExit,
  logAndTerminate
};

