import "babel-polyfill";
import './app';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { Pool } from 'pg';
import format from 'pg-format';
import { endpoint } from '../../config';
import swaggerUi from 'swagger-ui-express';
import { db_connection } from '../../config';

import swaggerDocument from './docs';


import auth from './routes/auth';
import articles from './routes/articles';
import categories from './routes/categories';
import comments from './routes/comments';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('tiny'));

app.use(`${endpoint}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => res.status(200).json({ status: 200, success: true, error: 'Welcome! The server is working properly' }));

app.use(`${endpoint}/auth`, auth);
app.use(endpoint, articles);
app.use(endpoint, categories);
app.use(endpoint, comments);

const pool = new Pool({
  connectionString: db_connection,
});

let myClient;


// pool.connect(function (err, client, done) {
//   if (err) console.log(err)
//   app.listen(4000, function () {
//     console.log('listening on 3000')
//   })
//   myClient = client
//   var ageQuery = format('SELECT * from numbers')
//   myClient.query(ageQuery, function (err, result) {
//     if (err) {
//       console.log(err)
//     }
//     console.log(result.rows[0])
//   })
// })

app.use((req, res) => {
  const err = new Error('Route Not Found');
  const status = 404;
  res.status(status).json({ status, success: false, error: err.message })
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
