import "babel-polyfill";
import './app';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

<<<<<<< HEAD
import { baseUrl2 } from '../../../config';
=======
import { endpoint } from '../../config';
>>>>>>> :sparkles: ft(psql):add create article endpoint
import swaggerDocument from './docs';
import auth from './routes/auth';
import articles from './routes/articles';
import categories from './routes/categories';
import comments from './routes/comments';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use(`${baseUrl2}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({ status: 200, success: true, error: 'Welcome! The server is working properly' }));

app.use(`${baseUrl2}/auth`, auth);
app.use(baseUrl2, articles);
app.use(baseUrl2, categories);
app.use(baseUrl2, comments);

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
