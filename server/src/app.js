import "babel-polyfill";
import './app';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import morgan from 'morgan';
import { port, endpoint } from '../../config';


import auth from './routes/auth';
import articles from './routes/articles';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.post('/', (req, res) => {
  return res.status(200).send('Welcome! The server is working properly');
})

app.use(`${endpoint}/auth`, auth);
app.use(endpoint, articles);

app.listen(port, () => {
    console.log(`The server is listning on port ${chalk.green(port)}`);
});

export default app;
