// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: "pg", //client: "pg" tells Knex that we're using PostgreSQL.
      connection: process.env.DATABASE_URL, //connection defines the database connection details.
      //enhanced connection 
      /*
      connection: {
      host: "localhost",
      url: process.env.DATABASE_URL //don't expose user, password and database
      timezone: "UTC"
    },
      */

    //migrations and seeds directories will store database schema definitions and sample data.
      migrations: { directory: "./migrations" },
      seeds: { directory: "./seeds" }
    //init generation
    /*
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
    */
    
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL, 
    /*
     connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    */   
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL, 
    /*
     connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    */
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
