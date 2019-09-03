/*import "babel-polyfill";
import './app';*/
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
//import debug from 'debug'('app');
import morgan from 'morgan';


import auth from './routes/auth';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));


app.post('/', (req, res) => {
  return res.status(200).send('Welcome! The server is working properly');
})

const baseUrl = '/api/v1';

//  / ROUTES ///
app.use(`${baseUrl}/auth`, auth);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`The server is listning on port ${chalk.green(port)}`);
});
