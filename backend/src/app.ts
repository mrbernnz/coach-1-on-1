import initializeDataSource from '@configs/dataSource';
import router from '@configs/routes';
import middleware, {errorListener} from '@middleware';
import Koa from 'koa';

initializeDataSource();

const app: Koa = new Koa();

app.use(middleware).use(router).on('error', errorListener);

export default app;
