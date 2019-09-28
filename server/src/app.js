import "babel-polyfill";
import './app';
import express from 'express';
import bodyParser from 'body-parser';
import chalk from 'chalk';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { errors } from 'celebrate';

import { port, endpoint } from '../../config';
import swaggerDocument from './docs'


import auth from './routes/auth';
import articles from './routes/articles';
import categories from './routes/categories';
import comments from './routes/comments';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use(`${endpoint}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  return res.status(200).json({ status: 200, success: true, error: 'Welcome! The server is working properly' });
})

app.use(`${endpoint}/auth`, auth);
app.use(endpoint, articles);
app.use(endpoint, categories);
app.use(endpoint, comments);

app.use(errors())

app.get('/*', (req, res) => {
  return res.status(404).json({
    status: 404,
    success: false,
    error: 'Route not found'
  });
})

app.listen(port, () => {
    console.log(`The server is listning on port ${chalk.green(port)}`);
});

export default app;
