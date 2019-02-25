import winston from 'winston';
import path from 'path';
import { consoleFormat, logFormat } from './formats';

const logPath = (filename: string): string => path.join(__dirname, '../../../logs', filename);

winston.addColors({
  info: 'white',
});

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: logFormat,
  transports: [
    new winston.transports.File({
      filename: logPath('error.log'),
      level: 'error',
    }),
    new winston.transports.File({
      filename: logPath('combined.log'),
    }),
    new winston.transports.Console({
      level: 'debug',
      format: consoleFormat,
    }),
  ],
});

export default logger;
