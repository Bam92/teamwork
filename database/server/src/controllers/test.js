import { Client } from 'pg';
import token from '../helpers/getToken';
import hash from '../helpers/hashPassword';
import checkPassword from '../helpers/checkPassword';
import { signupSchema, signinSchema } from '../helpers/validateAuthInput';

import { articleSchema } from '../helpers/validateArtInput';
import Search from '../helpers/search';
import dbConnection from '../db/getConnection';
import articleModel from '../models/articles';

// const client = new Client({
//   connectionString: db_connection,
// });

// client.connect();

class T {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} Employee object
   */
  static async send(req, res) {
    let success = true;
    let status = 201;
    // const data = req.body

    // res.json({message:"OK", data})

    try {
        const status = 200;
        const success = true;
        const { rows } = await dbConnection.query(articleModel.findAllArticles);
// console.log(data);
        res.status(status).json({
          status, success, message: 'Article created successfully', data: rows[0],
        });
      } catch (error) {
        return res.status(500).json({ status: 500, success: false, error: error.message });
      }

}

static async add(req, res) {
  let success = false;
  let status = 400;

  const articleInfo = req.body;
  const { error } = articleSchema(articleInfo);

  console.log(req.body, 'Hint')
  if (error) {
    const errorMessage = error.details[0].message;

    return res.status(status).json({ status, success, erDDDDDror: errorMessage });
  }

  const { title, article, category } = articleInfo;
  const articleDate = new Date();
  const findArticle = await Search.article(title);

  if (findArticle.rowCount !== 0) {
    return res.status(409).json({ status: 409, success, error: 'Article already exists' });
  }
console.log('curr', req.currentEmployee)
  try {
    const addArticle = await dbConnection.query(articleModel.insertArticle, [title, article, articleDate, req.currentEmployee.id, category]);
    if (addArticle.rowCount !== 0) {
      success = true;
      status = 201;
      const data = addArticle.rows[0];

      res.status(status).json({
        status, success, message: 'Article created successfully', data,
      });
    } return res.status(500).json({ status: 500, success: false, error: 'server error' });
  } catch (error) {
    return res.status(status).json({ status, success, EEError: error.message });
  }
}


}

export default T
