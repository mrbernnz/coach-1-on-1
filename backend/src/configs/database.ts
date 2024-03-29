import path from 'node:path';

const {DB_DEV_URL} = process.env;

export default {
  development: {
    type: 'postgres',
    url: DB_DEV_URL,
    logging: true,
    entities: path.join(__dirname, 'src/**/entity.ts')
    // migrations: path.join(__dirname, 'src/db/migrations/*.ts'),
  }
};
