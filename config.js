// import dotenv from 'dotenv';
const dotenv = require('dotenv');

dotenv.config();
module.exports = {
  endpoint: process.env.API_SUFFIX,
  privateKey: process.env.PRIVATE_KEY,
  port: process.env.PORT,
  coveralls: process.env.COVERALLS_REPO_TOKEN,
  type: process.env.TYPE,
  db_connection: process.env.DATABASE_URL,
};
