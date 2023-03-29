/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export const seed = async (knex) => {
  
  // await knex.raw('TRUNCATE TABLE "person" CASECADE')
  
  // Deletes ALL existing entries
  await knex('person').del()
  await knex('person').insert([
    {id: 1, email: 'rowValue1'},
    {id: 2, email: 'rowValue2'},
    {id: 3, email: 'rowValue3'}
  ]);
};
