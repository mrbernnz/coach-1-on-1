import {MigrationInterface, QueryRunner, Table, TableForeignKey} from 'typeorm';

export class CreateSlotTable1711552423105 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'slots',
        columns: [
          {name: 'id', type: 'integer', isPrimary: true, isNullable: false, isGenerated: true},
          {name: 'coach_id', type: 'integer', isNullable: true},
          {name: 'student_id', type: 'integer', isNullable: true},
          {name: 'appointment_date', type: 'timestamp', isNullable: true},
          {name: 'duration', type: 'integer', default: 7200000, isNullable: false},
          {name: 'rating', type: 'integer', isNullable: true},
          {name: 'notes', type: 'varchar', isNullable: true},
          {name: 'created_at', type: 'timestamp', isNullable: false, default: 'now()'},
          {name: 'updated_at', type: 'timestamp', isNullable: false, default: 'now()'}
        ]
      })
    );

    await queryRunner.createForeignKeys('slots', [
      new TableForeignKey({
        columnNames: ['coach_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'coaches',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['student_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'students',
        onDelete: 'CASCADE'
      })
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('slots');
    const foreignKeys = table?.foreignKeys;

    if (foreignKeys) {
      await queryRunner.dropForeignKeys('slots', foreignKeys);
    }

    await queryRunner.dropTable('slots');
  }
}
