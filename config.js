// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  endpoint: process.env.API_SUFFIX,
  baseUrl2: process.env.API_SUFFIX2,
  privateKey: process.env.PRIVATE_KEY,
  port: process.env.PORT,
  coveralls: process.env.COVERALLS_REPO_TOKEN,
  db_connection_test: process.env.DATABASE_URL_TEST,
  db_connection: process.env.DATABASE_URL,
  environment: process.env.NODE_ENV,

};
