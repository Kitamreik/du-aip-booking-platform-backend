/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex("bookings").del().then(() => {
    return knex("bookings").insert([
      { customer_name: "Alice", service: "Haircut", booking_time: "2025-03-15T12:00:00Z", status: "confirmed" },
      { customer_name: "Bob", service: "Massage", booking_time: "2025-03-16T15:30:00Z", status: "pending" }
    ]);
  });
};

//Generated
/*
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, colName: 'rowValue1'},
    {id: 2, colName: 'rowValue2'},
    {id: 3, colName: 'rowValue3'}
  ]);
};

*/
