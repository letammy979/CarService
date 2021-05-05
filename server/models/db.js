const { Pool } = require('pg');

const config = {
  max: 5,
  idleTimeoutMillis: 30000,
  user: 'csadmin',
  database: 'csdb',
  password: 'admin',
  host: 'postgres-db',
  port: 5432
};

const pool = new Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});

//export the query method for passing queries to the pool
module.exports.query = function(text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};
