import jwt from 'jsonwebtoken';

 /**
   * Gnerate Token
   * @param {string} email
   * @returns {string} token
   */
  const generateToken = email => {
    const token = jwt.sign({
      email,
    }, 'privateKey');

    return token;
  }

  export default generateToken;

