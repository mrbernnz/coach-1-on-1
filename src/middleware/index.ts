import {bodyParser} from '@koa/bodyparser';
import {BodyParserOptions} from '@koa/bodyparser/dist/body-parser.types';
import cors from '@koa/cors';
import compose from 'koa-compose';
import {middlewareLogger as logger} from '../utils/logger';
import {errorHandler} from './errorHandler';

const bodyParserOptions: BodyParserOptions = {
  encoding: 'utf8',
  onError(err, ctx): void {
    ctx.throw(422, 'body parse error', err);
  }
};

export default compose([errorHandler, cors(), bodyParser(bodyParserOptions), logger]);
