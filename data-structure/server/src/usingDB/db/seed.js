import { Pool } from 'pg';
import format from 'pg-format';

import { db_connection } from '../../../../config';
import hash from '../../helpers/hashPassword';

const pool = new Pool({
  connectionString: db_connection,
});

/**
 * Create an employee
 */
const createEmployee = () => {
  const hashedpassword = hash('@dminuser');
  const queryText = 'INSERT INTO employee(email, first_name, last_name, password, is_admin)  VALUES ($1, $2, $3, $4, $5)';

 /* pool.query(queryText, ['admin.test@wayfarer.cd', 'Admin', 'User', hashedpassword, true])
    .then(() => {
      pool.end();
      process.exit(0);
    })
    .catch((err) => {
      pool.end();
      process.exit(0);
      console.log('error is', err)
    });
*/
    pool.connect(function (err, done) {

      // myClient = client
      var ageQuery = format('INSERT INTO numbers(age) VALUES (85)')
      pool.query(ageQuery, function (err, result) {
        if (err) {
          console.log(err)
        }
        console.log(result)
      })
    })
};


module.exports = {
  createEmployee,
};

require('make-runnable');
