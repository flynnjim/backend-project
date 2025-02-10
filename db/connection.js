const { Pool } = require("pg");

// Check running envionment, default to development
const ENV = process.env.NODE_ENV || "development";

// add data from .env files to process.env
require("dotenv").config({
  path: `${__dirname}/../.env.${ENV}`,
});

// throw error if no value for pgdatabase or database url
if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

// add config variable
const config = {};

// congif object with database url and max to limit pool connections
if (ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
}
module.exports = new Pool(config);

//

// if (!process.env.PGDATABASE) {
//   throw new Error('PGDATABASE not set');
// }

// module.exports = new Pool();
