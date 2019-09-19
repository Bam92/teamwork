import bcrypt from 'bcrypt';

const  hashPassword = password => bcrypt.hash(password, 10);

module.exports = hashPassword;
