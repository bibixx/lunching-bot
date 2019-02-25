import winston from 'winston';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Format, TransformableInfo } from 'logform';
import fecha from 'fecha';

type FormatFunction = (msg: TransformableInfo) => string;

const print = (format: FormatFunction): Format => winston.format.printf((msg) => {
    const colorizer = winston.format.colorize();

    return colorizer.colorize(msg.level, format(msg));
  });

interface TimestampParams {
  format: string;
}

const timestampFormat = winston.format(
  (
    info,
    { format }: TimestampParams,
  ) => {
  /* eslint-disable no-param-reassign */
  const tzOffset: number = (new Date()).getTimezoneOffset();
  const nowRelative: Date = new Date(Date.now() + tzOffset * 60 * 1000 * -1);

  if (format) {
    info.timestamp = fecha.format(nowRelative, format);
  } else {
    info.timestamp = nowRelative.toISOString();
  }

  return info;
  /* eslint-enable no-param-reassign */
},
);

// eslint-disable-next-line import/prefer-default-export
export const consoleFormat = winston.format.combine(
  timestampFormat({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
  print(({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`),
);

export const logFormat = winston.format.combine(
  consoleFormat,
  winston.format.uncolorize(),
);
