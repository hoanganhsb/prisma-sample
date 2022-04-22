import { Knex } from 'knex';
import { config as loadEnv } from 'dotenv';

type Envs = 'development';

loadEnv();
const config: Record<Envs, Knex.Config> = {
  development: {
    client: 'mysql2',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'KnexMigrations',
      stub: 'migration.stub.ts',
    },
    seeds: {
      directory: ['./seeds/common'],
    },
  },
};

module.exports = config;
