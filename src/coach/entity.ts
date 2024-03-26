import {Dictionary, map, pick, prop} from 'rambda';
import Slot from 'slots/entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('coaches')
export default class Coach extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'first_name'})
  firstName: string;

  @Column({name: 'last_name'})
  lastName: string;

  @Column({name: 'phone_number'})
  phoneNumber: string;

  @CreateDateColumn({name: 'created_at', select: false})
  createdAt: Date;

  @UpdateDateColumn({name: 'updated_at', select: false})
  updatedAt: Date;

  @OneToMany(() => Slot, (slot) => slot.coach)
  slots: Slot[];

  static async findCoachPreviousCalls(id: number): Promise<
    Dictionary<{
      rating: string;
      notes: string;
    }>
  > {
    const current = new Date();
    const result = await this.createQueryBuilder('coach')
      .leftJoinAndSelect('coach.slots', 'slot')
      .where('coach.id = :id', {id})
      .andWhere('slot.appointmentDate < :current', {current})
      .getOne();

    const previousCall = (slot) => ({rating: slot.rating, notes: slot.notes});
    return map(previousCall, result?.slots as Slot[]) ?? [];
  }

  static async findCoachUpcomingSlots(id: number): Promise<Slot[]> {
    const current = new Date();
    const result = await this.createQueryBuilder('coach')
      .leftJoinAndSelect('coach.slots', 'slot')
      .where('coach.id = :id', {id})
      .andWhere('slot.appointmentDate >= :current', {current})
      .getOne();

    return (prop('slots', result) as unknown as Slot[]) ?? [];
  }

  static async findAllUpcomingCoachSlots() {
    const currentDatetime = new Date();
    const results = await this.createQueryBuilder('coach')
      .leftJoinAndSelect('coach.slots', 'slot')
      .where('slot.appointmentDate IS NOT NULL')
      .andWhere('slot.appointmentDate >= :currentDatetime', {currentDatetime})
      .andWhere('slot.coachId IS NOT NULL')
      .getMany();

    const mappedResults: any[] = [];

    for (const result of results) {
      for (const slot of result.slots) {
        mappedResults.push({
          ...slot,
          coach: {firstName: result.firstName, lastName: result.lastName}
        });
      }
    }
    return mappedResults;
  }

  static async findCoachPhone(id: number): Promise<string> {
    const result = await this.createQueryBuilder('coach').where('coach.id = :id', {id}).getOne();

    return pick('phoneNumber', result);
  }
}
