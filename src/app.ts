import router from '@configs/routes';
import middleware, {errorListener} from '@middleware';
import Koa from 'koa';

const app: Koa = new Koa();

app.silent = true;
app.use(middleware).use(router).on('error', errorListener);

export default app;
