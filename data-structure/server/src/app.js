import "babel-polyfill";
import './app';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import { endpoint as baseUrl } from '../../../config';
import swaggerDocument from './docs';
import auth from './routes/auth';
import articles from './routes/articles';
import categories from './routes/categories';
import comments from './routes/comments';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use(`${baseUrl}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({ status: 200, success: true, error: 'Welcome! The server is working properly' }));

app.use(`${baseUrl}/auth`, auth);
app.use(baseUrl, articles);
app.use(baseUrl, categories);
app.use(baseUrl, comments);

app.use((req, res) => {
  const err = new Error('Route Not Found');
  const status = 404;
  res.status(status).json({ status, success: false, error: err.message });
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
