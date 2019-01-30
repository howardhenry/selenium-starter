const { Logger, transports } = require('winston');
const chalk = require('chalk');
const _ = require('lodash');

const logger = new Logger({
  transports: [
    new transports.Console({
      prettyPrint: true,
      stringify: true,
      humanReadableUnhandledException: true,
      level: 'debug'
    })
  ]
});

const logMessage = (level, msg) => {
  let enhancedMsg = msg;

  if (msg instanceof Error) {
    enhancedMsg = msg.toString();
  } else if (_.isPlainObject(msg) || _.isArray(msg)) {
    enhancedMsg = JSON.stringify(msg);
  } else if (!_.isString(msg)) {
    enhancedMsg = '';
  }

  enhancedMsg = enhancedMsg.replace('\n', '. ');

  const colors = { debug: 'cyan', info: 'white', success: 'green', warn: 'yellow', error: 'red' };
  const color = colors[level];

  const logLevel = level === 'success' ? 'info' : level;
  enhancedMsg = logLevel === 'warn' || logLevel === 'info' ? ` ${enhancedMsg}` : enhancedMsg;
  logger[logLevel](`${chalk[color](enhancedMsg)}`);
};

module.exports = {
  debug: (msg) => logMessage('debug', msg),
  info: (msg) => logMessage('info', msg),
  success: (msg) => logMessage('success', msg),
  warn: (msg) => logMessage('warn', msg),
  error: (msg) => logMessage('error', msg)
};
