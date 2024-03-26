import Coach from '@coach/entity';
import {addPhoneNumbers} from '@coach/service';
import {dataSource} from '@configs/dataSource';
import Slot from 'slots/entity';
import {logger} from 'utils/logger';
import Student from './entity';

export function getStudents() {
  return Student.find();
}

export function getStudent(studentId: number) {
  return Student.findOneBy({id: studentId});
}

export async function bookCoachCall({slotId, studentId}) {
  return dataSource.transaction(async () => {
    const slot = await Slot.findCoachSlot(slotId);
    if (!slot?.studentId) {
      await Slot.addStudentToCoachSlot({studentId, slotId});
    }
  });
}

export async function getAllUpcomingSlot() {
  const slots = await Coach.findAllUpcomingCoachSlots();
  logger.debug(slots);
  return addPhoneNumbers(slots);
}
