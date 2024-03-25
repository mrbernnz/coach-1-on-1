import pino, {Logger} from 'pino';
import koaPinoLogger from 'koa-pino-logger';

const loggerOptions = {name: 'Stepful Backend'};
export const logger: Logger = pino(loggerOptions);

export const middlewareLogger = koaPinoLogger(loggerOptions);
