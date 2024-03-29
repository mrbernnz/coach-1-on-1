import {Context} from 'koa';
import {bookCoachCall, getAllUpcomingSlot, getStudent, getStudents} from './service';

export async function viewAllStudents(ctx: Context) {
  ctx.status = 200;
  ctx.body = await getStudents();
}

export async function viewStudent(ctx: Context) {
  ctx.status = 200;
  ctx.body = await getStudent(ctx.params.studentId);
}

export async function createCoachCall(ctx: Context) {
  const slotId = ctx.params.slotId;
  const studentId = ctx.params.studentId;
  await bookCoachCall({studentId, slotId});

  ctx.status = 204;
}

export async function viewSlots(ctx: Context) {
  ctx.body = await getAllUpcomingSlot();
  ctx.status = 200;
}
