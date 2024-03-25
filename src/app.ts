import Koa from 'koa';
import {errorListener} from 'middleware/errorHandler';

const app: Koa = new Koa();

app.silent = true;
app.on('error', errorListener);

export default app;
