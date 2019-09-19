import { employee_db, getOne } from '../models/employee';
import token from '../helpers/getToken';
import hash from '../helpers/hashPassword';
import checkPassword from '../helpers/checkPassword';

const Auth = {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} Employee object
   */
  async signup(req, res) {
    let success = false;
    let status = 400;

   const {
     firstName,
     lastName,
     email,
     password,
     gender,
     jobRole,
     department,
     address } = req.body;

     const data = req.body;

   if (firstName && email && password) {
     success = true;
     status = 201;

     data.password = await hash(password)

     data._id = employee_db.length +1;
     employee_db.push(data)

    data.token = token(email);

    delete data.password;

    return res.status(status).json({ status, success, message: 'User created successfully', data });
   } else {
     return res.status(status).json({ status, success, error: 'Required field missing. Try again' });
   }

  },

  /**
   * Signin an Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async signin(req, res) {
    let success = false;
    let status = 400;

   const {
     email,
     password
      } = req.body;


   if (email && password) {
     const user = getOne(email);

    if (user) {
      const comparePassword = await checkPassword(password, user.password);
       if (!comparePassword) return res.status(status).json({ status, success, error: 'Password incorrect. Try again' });

      success = true;
      status = 200;

      const data = getOne(email);

    data.token = token(email);
    delete data.password;

    return res.status(status).json({ status, success, message: 'Employee signed in successfully', data });
  } else {
    return res.status(status).json({ status, success, error: 'Employee does not exist. Try again' });
  }
   } else {
     return res.status(status).json({ status, success, error: 'Email or password not provided. Try again' });
   }

  }
};

export default Auth;
