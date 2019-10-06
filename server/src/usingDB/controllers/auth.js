import { Client } from 'pg';
import { employee_db, getOne } from '../models/employee';
import token from '../../helpers/getToken';
import hash from '../../helpers/hashPassword';
import checkPassword from '../../helpers/checkPassword';
import { signupSchema, signinSchema } from '../../helpers/validateAuthInput';

import { db_connection } from '../../../../config';

const client = new Client({
  connectionString: db_connection,
});

client.connect();

class Auth {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} Employee object
   */
  static signup(req, res) {
    let success = true;
    let status = 201;

    const userInfo = req.body;
    const {
      first_name, last_name, email, password, gender, jobRole, department, address,
    } = userInfo;
    const hashPassword = hash(password);
    const { error } = signupSchema(userInfo);

    console.log('hash error', hashPassword);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }


    const cols = [first_name, last_name, email, hashPassword, gender, jobRole, department, address];
    const sql = 'INSERT INTO employee(first_name, last_name, email, password, gender, jobRole, department, address) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

    client
      .query(sql, cols, (err, result) => {
        if (err) {
          status = 400;
          success = false;

          if (err.routine === '_bt_check_unique') return res.status(409).json({ status: 409, success, error: 'User with this email already exists.' });

          res.status(status).json({
            status, success, error: 'Error Saving : %s ', err,
          });
        }

        const data = result.rows[0];
        data.token = token(email);

        delete data.password;

        res.status(status).json({
          status, success, message: 'User created successfully', data,
        });
      });
  }

  /**
   * Signin an Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static signin(req, res) {
    let success = false;
    let status = 400;

    const userInfo = req.body;

    const { error } = signinSchema(userInfo);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }

    const user = getOne(userInfo.email);

    if (user) {
      const comparePassword = checkPassword(userInfo.password, user.password);

      if (!comparePassword) return res.status(status).json({ status, success, error: 'Password incorrect. Try again' });

      success = true;
      status = 200;

      const data = user;

      data.token = token(userInfo.email);
      delete data.password;

      return res.status(status).json({
 status, success, message: 'Employee signed in successfully', data
});
    }
    status = 404;
    return res.status(status).json({ status, success, error: 'Employee does not exist. Try again' });
  }
}

export default Auth;
