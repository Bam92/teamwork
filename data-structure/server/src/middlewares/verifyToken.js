import jwt from 'jsonwebtoken';
import { getOne as employee } from '../usingDS/models/employee';
import { privateKey } from '../../../config';

 /**
   * Verify Token
   * @param {string} token
   * @returns {string} decoded
   */
    const verifyToken = (req, res, next) => {
    let success = false;
    let status = 401;

    const { token: headerToken = '' } = req.headers;
    if (!headerToken) {
      status = 400;
      return res.status(status).json({status, success, message: 'No token provided'});
    }

    try {
      const decoded = jwt.verify(headerToken, privateKey);
      // status = 401;

      if (!decoded) return res.status(status).json({ status, success, error: 'Invalid token provided' });

      const getEmployee = employee(decoded);
      if (!getEmployee) return res.status(status).json({ status, error: 'Invalid token provided' });

      req.currentEmployee = getEmployee;

      next()
    } catch (error) {
      return res.status(status).json({ status, success, error: error.message });
    }
  }

  export default verifyToken;
