import { employee_db, getOne } from '../models/employee';
import token from '../../helpers/getToken';
import hash from '../../helpers/hashPassword';
import checkPassword from '../../helpers/checkPassword';
import { signupSchema, signinSchema } from '../../helpers/validateAuthInput';

class Auth {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} Employee object
   */
  static signup(req, res) {
    let success = false;
    let status = 400;

    const userInfo = req.body;

    const { error } = signupSchema(userInfo);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }

    if (!getOne(userInfo.email)) {
      success = true;
      status = 201;

      userInfo.password = hash(userInfo.password);
      userInfo._id = employee_db.length + 1;

      employee_db.push({
        ...userInfo,
      });

      userInfo.token = token(userInfo.email);

      delete userInfo.password;

      return res.status(status).json({
        status, success, message: 'User created successfully', data: userInfo,
      });
    } return res.status(409).json({ status: 409, success, error: 'User already exist. Try again an other email' });
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
        status, success, message: 'Employee signed in successfully', data,
      });
    }
    status = 404;
    return res.status(status).json({ status, success, error: 'Employee does not exist. Try again' });
  }
}

export default Auth;
