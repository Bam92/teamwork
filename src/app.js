import express from 'express';
var chalk = require('chalk');
var debug = require('debug')('app');
var morgan = require('morgan');

var app = express();

const port = process.env.PORT || 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
  res.json('Welcome! The server is working properly');
})

app.listen(port, () => {
    debug(`The server is listning on port ${chalk.green(port)}`);
});
