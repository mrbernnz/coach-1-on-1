import {MigrationInterface, QueryRunner, Table} from 'typeorm';

export class CreateCoachTable1711468267787 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'coaches',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isNullable: false,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {name: 'first_name', type: 'varchar', isNullable: false},
          {name: 'last_name', type: 'varchar', isNullable: false},
          {name: 'phone_number', type: 'varchar', isNullable: false},
          {name: 'created_at', type: 'timestamp', isNullable: false, default: 'now()'},
          {name: 'updated_at', type: 'timestamp', isNullable: false, default: 'now()'}
        ]
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('coaches');
  }
}
