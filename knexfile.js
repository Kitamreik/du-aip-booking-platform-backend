// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
require("dotenv").config();
const { parse } = require("pg-connection-string");

const dbUrl = process.env.DATABASE_URL;
const dbConfig = parse(dbUrl);

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined in .env");
} else {
  console.log("DB Connection established. Use PORT",`${process.env.DB_PORT}`,"to fetch the back end routes")
}

const isProduction = process.env.NODE_ENV === "production"; //prod check

module.exports = {

  development: {
    client: "pg", //client: "pg" tells Knex that we're using PostgreSQL.
      //connection defines the database connection details.
    
    connection: {
      host: dbConfig.host, //"localhost"
      user: dbConfig.user, 
      password: dbConfig.password,
      database: dbConfig.database, //alternatively, String(process.env.DB_PASSWORD) w/o parse package
      port: dbConfig.port ? Number(dbConfig.port) : 5432, //postgres port 
      timezone: "UTC",
      ssl: dbConfig.ssl || false, // important if using Render or hosted Postgres 
    },
      
    //init generation
    /*
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    }
    */
    //migrations and seeds directories will store database schema definitions and sample data.
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" }
    
  },

  staging: {
    client: "postgresql", //postgresql
    connection: {
      user: dbConfig.user, 
      password: dbConfig.password,
      database: dbConfig.database,
      }, 
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: "postgresql",
    connection: {
      user: dbConfig.user, 
      password: dbConfig.password,
      database: dbConfig.database,
      ssl: isProduction ? { rejectUnauthorized: false } : false
    }, 
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
