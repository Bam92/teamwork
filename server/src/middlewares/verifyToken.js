import jwt from 'jsonwebtoken';
import { getOne as employee } from '../models/employee';

 /**
   * Verify Token
   * @param {string} token
   * @returns {string} decoded
   */
    const verifyToken = (req, res, next) => {
    let success = false;
    let status = 400;

    const { token: headerToken = '' } = req.headers;
    if (!headerToken) {
      status = 401;
      return res.status(status).json({status, success, message: 'No token provided'});
    }

    try {
      const decoded = jwt.verify(headerToken, 'privateKey');
      status = 401;
      if (!decoded) return res.status(status).json({ status, success, error: 'Invalid token provided' });

      const getEmployee = employee(decoded.email);

      if (!getEmployee) return res.status(status).json({ status, error: 'Invalid token provided' });

      req.currentEmployee = getEmployee;

      next()
    } catch (error) {
      return res.status(400).json({ status: 400, error: error.message });
    }
  }

  export default verifyToken;
