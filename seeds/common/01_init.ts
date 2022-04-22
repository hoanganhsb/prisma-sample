import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Inserts seed entries
  await knex("User")
    .insert([
      { name: "test1", email: "test1@gmail.com" },
      { name: "test2", email: "test2@gmail.com" },
    ])
    .onConflict("name")
    .merge();
}
