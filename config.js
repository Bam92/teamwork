// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  endpoint: process.env.API_SUFFIX,
  privateKey: process.env.PRIVATE_KEY,
  port: process.env.PORT
};
