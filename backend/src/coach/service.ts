import Student from '@student/entity';
import {Dictionary, isNil} from 'rambda';
import Slot from 'slots/entity';
import Coach from './entity';

export async function addPhoneNumbers(slots: Slot[]): Promise<Record<string, unknown>[]> {
  const updatedSlots: Record<string, unknown>[] = [];

  for (const slot of slots) {
    let coachPhone, studentPhone;
    if (!isNil(slot.studentId)) {
      coachPhone = await Coach.findCoachPhone(slot.coachId);
      studentPhone = await Student.findStudentPhone(slot.studentId);
    }
    updatedSlots.push({...slot, coach: {...slot.coach, ...coachPhone}, student: studentPhone});
  }
  return updatedSlots;
}

export function getAllCoaches() {
  return Coach.find();
}

export function getCoach(coachId: number) {
  return Coach.findOneBy({id: coachId});
}

export async function getPreviousCoachCalls(coachId: number): Promise<
  Dictionary<{
    rating: string;
    notes: string;
  }>
> {
  return Coach.findCoachPreviousCalls(coachId);
}

export async function getUpcomingCoachSlots(coachId: number): Promise<Record<string, unknown>[]> {
  const slots = await Coach.findCoachUpcomingSlots(coachId);
  return addPhoneNumbers(slots);
}

export async function addCoachSlots(
  coachId: number,
  slots: {appointmentDate: Date}[]
): Promise<void> {
  await Slot.createCoachSlots(slots, coachId);
}

export async function documentCoachCall(
  slotId: number,
  data: Record<string, string | number>
): Promise<void> {
  await Slot.addRatingsAndNotesToCoachCall(slotId, data);
}
