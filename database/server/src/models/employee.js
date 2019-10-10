const findEmployee = 'SELECT * FROM employee WHERE email = $1';

const createEmployeeTable = `
CREATE TABLE IF NOT EXISTS employee(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(128) NOT NULL,
  last_name VARCHAR(128),
  email VARCHAR(25) UNIQUE NOT NULL,
  password VARCHAR(128) NOT NULL,
  gender VARCHAR(10),
  jobRole VARCHAR(35),
  department VARCHAR(18),
  address VARCHAR(35)
  )`;

const insertEmployee = `
INSERT INTO employee(
  email,
  first_name,
  last_name,
  password,
  ) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *`;

export default {
  createEmployeeTable,
  insertEmployee,
  findEmployee,
};
