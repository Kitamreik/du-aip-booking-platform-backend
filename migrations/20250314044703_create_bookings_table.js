/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("bookings", (table) => { //knex.schema.createTable defines a new table.
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()")); //table.uuid("id") ensures each booking has a unique identifier.
      table.string("customer_name").notNullable();
      table.string("service").notNullable();
      table.timestamp("booking_time").notNullable().defaultTo(knex.fn.now()); 
      table.enu("status", ["pending", "confirmed", "cancelled"]).defaultTo("pending");
      table.timestamps(true, true); //table.timestamps(true, true) automatically adds created_at and updated_at fields.
    });
  };

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("bookings");
};
