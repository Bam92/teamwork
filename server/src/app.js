import "babel-polyfill";
import './app';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { endpoint } from '../../config';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './docs'


import auth from './routes/auth';
import articles from './routes/articles';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use(`${endpoint}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.post('/', (req, res) => {
  return res.status(200).json('Welcome! The server is working properly');
})

app.use(`${endpoint}/auth`, auth);
app.use(endpoint, articles);

app.use((req, res) => {
  const err = new Error('Not Found');
  const status = err.status = 404;
  res.status(status).json({
    status,
    success: false,
    error: err.message
  })
});

app.use((err, res) => {
  const status = err.status || 500;
  res.status(status).json({
    status,
    success: false,
    error: err.message,
  });
});


export default app;
