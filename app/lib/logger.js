import fs from 'fs';
import { createLogger, format, transports } from 'winston';

const moment = require('moment-timezone');

const { combine, printf } = format;

const myFormat = printf(info => `${info.timestamp} [${info.level}]: ${info.message}`);

const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

const appendTimestamp = format((info, opts) => {
  if (opts.tz) { info.timestamp = moment().tz(opts.tz).format(); }
  return info;
});

const logLevel = 'info';
const loggerTransport = [
  new transports.File({
    level: logLevel,
    filename: `${logDir}/${logLevel}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    colorize: true,
  }),
];

loggerTransport.push(new transports.Console({
  level: 'debug',
  handleExceptions: true,
  json: false,
  colorize: true,
}));

const logger = createLogger({
  format: combine(
    appendTimestamp({ tz: 'Asia/Kolkata' }),
    myFormat,
  ),
  transports: loggerTransport,
  exitOnError: false,
});

module.exports = logger;

module.exports.stream = {
  write: (message) => {
    logger.info(message);
  },
};
