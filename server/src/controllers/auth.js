import debug from 'debug'
import { employee_db, getOne, userExist } from '../models/employee';
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

    const userInfo = req.body;

   if (userInfo.firstName && userInfo.email && userInfo.password) {
     if (getOne(userInfo.email)) return res.status(409).json({ status: 409, success, error: 'User already exist. Try again an other email' });
     success = true;
     status = 201;

     userInfo.password  = await hash(userInfo.password);
     userInfo._id = employee_db.length + 1;

     employee_db.push({
       ...userInfo
     })

    userInfo.token = token(userInfo.email);

    delete userInfo.password;
console.log('db: ', employee_db)
    return res.status(status).json({ status, success, message: 'User created successfully', data: userInfo });
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

    // if (userInput.email && userInput.password) {
    //   res.json('Ok')
    // } else {
    //   res.json('Fields not allowed!')
    // }
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

      const data = user;

      data.token = token(email);
      delete data.password;

      return res.status(status).json({ status, success, message: 'Employee signed in successfully', data });
  } else {
    status = 404;
    return res.status(status).json({ status, success, error: 'Employee does not exist. Try again' });
  }
   } else {
     return res.status(status).json({ status, success, error: 'Email or password not provided. Try again' });
   }

  }
};

export default Auth;
