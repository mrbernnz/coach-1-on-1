import {pick} from 'rambda';
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

@Entity('students')
export default class Student extends BaseEntity {
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

  @OneToMany(() => Slot, (slot) => slot.student)
  slots: Slot[];

  static async findStudentPhone(id: number): Promise<string> {
    const result = await this.createQueryBuilder('student')
      .where('student.id = :id', {id})
      .getOne();

    return pick('phoneNumber', result);
  }
}
