import Coach from '@coach/entity';
import coachFactory from 'db/factories/coach';
import {DataSource} from 'typeorm';
import {Seeder, SeederFactoryManager} from 'typeorm-extension';

export class Coaches1711476737312 implements Seeder {
  track = false;

  public async run(dataSource: DataSource, _factoryManager: SeederFactoryManager): Promise<any> {
    const coaches = coachFactory(5);
    const repository = dataSource.getRepository(Coach);
    await repository.insert(coaches);
  }
}
