import {Context} from 'koa';
import {
  addCoachSlots,
  documentCoachCall,
  getAllCoaches,
  getCoach,
  getPreviousCoachCalls,
  getUpcomingCoachSlots
} from './service';

export async function viewAllCoaches(ctx: Context) {
  ctx.status = 200;
  ctx.body = await getAllCoaches();
}

export async function viewCoach(ctx: Context) {
  ctx.status = 200;
  ctx.body = await getCoach(ctx.params.coachId);
}

export async function createSlots(ctx: Context) {
  const id = ctx.params.coachId;
  const slots = ctx.request.body;

  for (const slot of slots) {
    slot.appointmentDate = new Date(slot.appointmentDate);
  }

  await addCoachSlots(id, slots);
  ctx.status = 201;
}

export async function viewSlots(ctx: Context) {
  const coachId = ctx.params.coachId;

  if (ctx.query?.previous) {
    ctx.body = await getPreviousCoachCalls(coachId);
    ctx.status = 200;
  } else {
    ctx.body = await getUpcomingCoachSlots(coachId);
    ctx.status = 200;
  }
}

export async function updateSlot(ctx: Context) {
  const data = ctx.request.body;
  const slotId = ctx.params.slotId;
  await documentCoachCall(slotId, data);

  ctx.status = 204;
}
