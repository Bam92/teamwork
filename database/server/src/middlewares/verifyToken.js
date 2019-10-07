import jwt from 'jsonwebtoken';
import { privateKey } from '../../../../config';
import dbConnection from '../db/getConnection';
import findEmployee from '../models/employee';
/**
   * Verify Token
   * @param {string} token
   * @returns {string} decoded
   */
const verifyToken = async (req, res, next) => {
  const success = false;
  let status = 401;

  const { token: headerToken = '' } = req.headers;

  if (!headerToken) {
    status = 400;
    return res.status(status).json({ status, success, message: 'No token provided' });
  }

  try {
    const decoded = await jwt.verify(headerToken, privateKey);

    if (!decoded) return res.status(status).json({ status, success, error: 'Invalid token provided' });
    const { rows } = await dbConnection.query(findEmployee, [decoded]);

    if (!rows[0]) {
      return res.status(400).json({ status, success, error: 'Invalid token provided' });
    }

    req.currentEmployee = rows[0];

    next();
  } catch (error) {
    return res.status(status).json({ status, success, error: error.message });
  }
};

export default verifyToken;
