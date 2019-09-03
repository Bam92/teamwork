import employee from '../models/employee';
import token from '../helpers/getToken';

const Auth = {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  signup(req, res) {
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

    employee.push(data)

    console.log('employee: ', employee)
    data.token = token(email);
    delete data.password;

    return res.status(status).json({ status, success, message: 'User created successfully', data });
   } else {
     return res.status(status).json({ status, success, error: 'Required field missing. Try again' });
   }

  }
};

export default Auth;
