const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const _ = require('lodash');

const logger = createLogger({
  transports: [
    new transports.Console({
      format: format.simple(),
      humanReadableUnhandledException: true,
      level: 'debug',
      prettyPrint: true,
      stringify: true
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

  const colors = {
    debug: 'cyan',
    error: 'red',
    info: 'white',
    success: 'green',
    warn: 'yellow'
  };
  const color = colors[level];

  const logLevel = level === 'success' ? 'info' : level;
  enhancedMsg = logLevel === 'warn' || logLevel === 'info' ? ` ${enhancedMsg}` : enhancedMsg;
  logger[logLevel](`${chalk[color](enhancedMsg)}`);
};

module.exports = {
  debug: (msg) => logMessage('debug', msg),
  error: (msg) => logMessage('error', msg),
  info: (msg) => logMessage('info', msg),
  success: (msg) => logMessage('success', msg),
  warn: (msg) => logMessage('warn', msg)
};
