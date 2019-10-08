import bcrypt from 'bcrypt';

const hashPassword = (password) => bcrypt.hashSync(password, 10);

module.exports = hashPassword;
