import {DataSource, DataSourceOptions} from 'typeorm';
import {SeederOptions} from 'typeorm-extension';
import {logger} from 'utils/logger';

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: 'localhost',
  database: 'Stepful_DB',
  logging: ['query', 'error'],
  entities: ['src/**/entity.ts'],
  migrationsRun: false,
  synchronize: false,
  migrations: ['src/db/migrations/*.ts'],
  seeds: ['src/db/seeds/*.ts'],
  factories: ['src/db/factories/*.ts'],
  factoriesLoad: true
};

const dataSource = new DataSource(dataSourceOptions);

export {dataSource, dataSourceOptions};

export default function initializeDataSource() {
  dataSource
    .initialize()
    .then(() => {
      logger.info('Initialized DataSource.');
    })
    .catch((error) => {
      logger.error('Error initializing DataSource.', error);
    });
}
