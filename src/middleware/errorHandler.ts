import {Context, Next} from 'koa';

export async function errorHandler(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status ?? err.statusCode ?? 500;
    ctx.body = {message: err.message};
    ctx.app.emit('error', err, ctx);
  }
}

export function errorListener(err: Error, ctx: Context) {
  const errMessage = err?.message;
  ctx.log.error(`Stepful Api Error: ${errMessage}`);
}
