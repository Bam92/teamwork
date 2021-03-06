import { Client } from 'pg';
import token from '../helpers/getToken';
import hash from '../helpers/hashPassword';
import checkPassword from '../helpers/checkPassword';
import { signupSchema, signinSchema } from '../helpers/validateAuthInput';
import { db_connection } from '../../../../config';
import employeeModel from '../models/employee';
import dbConnection from '../db/getConnection';

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

    const { error } = signupSchema(req.body);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(400).json({ status: 400, success, error: errorMessage });
    }

    const userInfo = req.body;
    const {
      first_name, last_name, email, password, gender, jobRole, department, address,
    } = userInfo;
    const hashPassword = hash(password);


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
  static async signin(req, res) {
    let success = true;
    let status = 200;

    const { error } = signinSchema(req.body);

    if (error) {
      success = false;
      status = 400;
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }

    const { email, password } = req.body;

    try {
      const rows = await dbConnection.query(employeeModel.findEmployee, [email]);
      status = 404;

      if (rows.rowCount === 0) {
        res.status(status).json({
          status, success, message: 'Sorry, this user does not exist',
        });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, success, error: error.message });
    }

    client
      .query('SELECT * FROM employee WHERE email=$1', [email], (err, result) => {
        if (err) {
          console.log(err);
          res.status(status).json(err);
        }

        if (!result) return res.status(401).json({ status: 401, success, error: 'Invalid credential' });
        if (!checkPassword(password, result.rows[0].password)) return res.status(401).json({ status: 401, success, message: 'Invalid credential' });

        const data = result.rows[0];
        data.token = token(email);

        delete data.password;

        res.status(status).json({
          status, success, message: 'User loged in successfully', data,
        });
      });
  }
}

export default Auth;
