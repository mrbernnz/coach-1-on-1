import koaPinoLogger from 'koa-pino-logger';
import pino, {Logger, LoggerOptions} from 'pino';
import {equals} from 'rambda';

const loggerOptions: LoggerOptions = {name: 'Stepful Backend', level: 'debug'};

if (equals(process.env.NODE_ENV, 'development')) {
  loggerOptions.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
      errorProps: '|',
      levelFirst: true
    }
  };
}
export const logger: Logger = pino(loggerOptions);

export const middlewareLogger = koaPinoLogger(loggerOptions);
