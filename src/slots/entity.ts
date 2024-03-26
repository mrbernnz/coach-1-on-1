import Coach from '@coach/entity';
import Student from '@student/entity';
import {equals} from 'rambda';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('slots')
export default class Slot extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'coach_id'})
  coachId: number;

  @Column({name: 'student_id'})
  studentId: number;

  @Column({name: 'duration', default: 7200000})
  duration: number;

  @Column('timestamptz', {name: 'appointment_date'})
  appointmentDate: Date;

  @Column()
  rating: number;

  @Column()
  notes: string;

  @CreateDateColumn({name: 'created_at', select: false})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', select: false})
  updatedAt: Date;

  @ManyToOne(() => Coach, (coach) => coach.slots, {cascade: true})
  @JoinColumn({name: 'coach_id'})
  coach: Coach;

  @ManyToOne(() => Student, (student) => student.slots, {cascade: true})
  @JoinColumn({name: 'student_id'})
  student: Student;

  static findCoachSlot(slotId: number) {
    return this.createQueryBuilder('slot').where('id = :id', {id: slotId}).getOne();
  }

  static async createCoachSlots(slots: {appointmentDate: Date}[], id: number): Promise<void> {
    await this.createCoachSlot(slots, id);
  }

  static async addStudentToCoachSlot({slotId, studentId}) {
    await this.createQueryBuilder()
      .update()
      .set({studentId: studentId})
      .where('id = :id', {id: slotId})
      .execute();
  }

  static async addRatingsAndNotesToCoachCall(
    id: number,
    data: Record<string, string | number>
  ): Promise<void> {
    await this.createQueryBuilder().update().set(data).where('id = :id', {id}).execute();
  }

  private static async createCoachSlot(
    slots: {appointmentDate: Date}[],
    coachId: number
  ): Promise<void> {
    for (const slot of slots) {
      const appointmentDate = slot.appointmentDate;
      const count = await this.checkCoachAvailability(coachId, appointmentDate);

      if (equals(count, 0)) {
        await this.createQueryBuilder()
          .insert()
          .values({...slot, coachId: coachId})
          .execute();
      }
    }
  }

  private static checkCoachAvailability(coachId: number, appointmentDate: Date): Promise<number> {
    const twoHours = 2 * 60 * 60 * 1000;
    const previousAppts = new Date(appointmentDate.getTime() - twoHours);
    const nextAppts = new Date(appointmentDate.getTime() + twoHours);

    return this.createQueryBuilder('slot')
      .where('slot.appointmentDate BETWEEN :start AND :end', {start: previousAppts, end: nextAppts})
      .andWhere('slot.coachId = :coachId', {coachId: coachId})
      .getCount();
  }
}
