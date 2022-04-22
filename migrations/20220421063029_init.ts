import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("User", (table) => {
    table.increments("id").primary();
    table.string("email").notNullable().unique();
    table.string("name");
  });

  await knex.schema.createTable("Post", (table) => {
    table.increments("id").primary().unsigned();
    table.string("title").notNullable();
    table.string("content");
    table.boolean("published").notNullable().defaultTo(false);
    table.integer("viewCount").notNullable().defaultTo(0);
    table.timestamp("createdAt").notNullable().defaultTo(knex.fn.now());
    table
      .timestamp("updatedAt")
      .notNullable()
      .defaultTo(knex.raw("CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP"));
    table
      .integer("authorId")
      .unsigned()
      .nullable()
      .references("id")
      .inTable("User")
      .index();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("Post");
  await knex.schema.dropTableIfExists("User");
}
