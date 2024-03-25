import {Context} from 'koa';

export function createSlots(ctx: Context) {
  ctx.body = 'created upcoming slots';
  ctx.status = 201;
}

export function viewSlots(ctx: Context) {
  ctx.log.info(ctx.query);
  if (ctx.query?.previous) {
    ctx.body = 'view previous slots';
    ctx.status = 200;
  } else {
    ctx.body = 'view upcoming slots';
    ctx.status = 200;
  }
}
