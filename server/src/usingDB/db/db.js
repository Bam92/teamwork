import { Pool } from 'pg';

import { db_connection } from '../../../../config';

const pool = new Pool({
  connectionString: db_connection,
});

console.log('DB..', pool)
/**
 * Create User Table
 */
const createEmployeeTable = () => {
  const queryText = `CREATE TABLE IF NOT EXISTS
  employee(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128) UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    is_admin BOOLEAN NOT NULL
  )`;

  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(0);
    });
};

/**
 * Drop User Table
 */
const dropEmployeeTable = () => {
  const queryText = 'DROP TABLE IF EXISTS employee';
  pool.query(queryText)
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch(() => {
      pool.end();
      process.exit(0);
    });
};


/**
 * Create All Tables
 */
const createAllTables = () => {
  createEmployeeTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  createEmployeeTable();
};


pool.connect()
  .then(() => {
  })
  .catch(() => {
  });

/**
   * DB Query
   * @param {string} text
   * @param {Array} params
   * @returns {object} object
   */
const runQuery = (text, params) => new Promise((resolve, reject) => {
  pool.query(text, params)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});
const runq = (text, params) => {
  const row = pool.query(text, params);
  return row;
};
const getAll = query => new Promise((resolve, reject) => {
  pool.query(query)
    .then((res) => {
      resolve(res);
    })
    .catch((err) => {
      reject(err);
    });
});

module.exports = {
  createEmployeeTable,
  createAllTables,
  dropEmployeeTable,
  dropAllTables,
  pool,
  runQuery,
  runq,
  getAll,
};

require('make-runnable');
