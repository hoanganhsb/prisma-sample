import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('', (table) => {});
}

export async function down(knex: Knex): Promise<void> {
  throw new Error('no coming back');
}
