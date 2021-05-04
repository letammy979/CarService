const { Pool } = require('pg');

const PG_URI = 'postgres://dzrtdkmo:k_B18EgDOuStmN8qYFUCDvFrHXOD__Ym@queenie.db.elephantsql.com:5432/dzrtdkmo';

const pool = new Pool({
  connectionString: PG_URI,
});

//export the query method for passing queries to the pool
module.exports.query = function(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};
