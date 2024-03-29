import Student from '@student/entity';
import studentFactory from 'db/factories/student';
import {DataSource} from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension';

export class Students1711488880184 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<any> {
    const students = studentFactory(10);
    const repository = dataSource.getRepository(Student);
    await repository.insert(students);
  }
}
