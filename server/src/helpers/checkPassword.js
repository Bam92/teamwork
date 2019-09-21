import bcrypt from 'bcrypt';

const  checkPassword = (plaintextPassword, hashPassword) => bcrypt.compare(plaintextPassword, hashPassword);

module.exports = checkPassword;
