import bcrypt from 'bcrypt';

const checkPassword = (plaintextPassword, hashPassword) => bcrypt.compareSync(plaintextPassword, hashPassword);

module.exports = checkPassword;
