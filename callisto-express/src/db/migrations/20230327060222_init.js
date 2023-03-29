/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ // 데이터베이스 생성
export async function up(knex) {
  await knex.schema.createTable("person", (table) => {
    table.increments("id");
    table.string("email").notNullable().unique();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */ // 데이터베이스 롤백
export async function down(knex) {
  await knex.schema.dropTableIfExists('person')
}