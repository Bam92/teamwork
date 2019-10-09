import { articleSchema, idSchema } from '../helpers/validateArtInput';
import Search from '../helpers/search';
import dbConnection from '../db/getConnection';
import articleModel from '../models/articles';

class Article {
  static async getArticles(req, res) {
    try {
      const status = 200;
      const success = true;
      const { rows } = await dbConnection.query(articleModel.findAllArticles);

      res.status(status).json({
        status, success, message: 'Article recently published', data: rows,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, success: false, error: error.message });
    }
  }

  static async createArticle(req, res) {
    let success = false;
    let status = 400;

    const articleInfo = req.body;
    const { error } = articleSchema(articleInfo);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }

    const { title, article, category } = articleInfo;
    const articleDate = new Date();
    const findArticle = await Search.article(title);

    if (findArticle.rowCount !== 0) {
      return res.status(409).json({ status: 409, success, error: 'Article already exists' });
    }

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
      return res.status(status).json({ status, success, error: error.message });
    }
  }

  static async updateArticle(req, res) {
    return 'OK';
  }

  static async deleteArticle(req, res) {
    let status = 400;
    let success = false;
    const { id } = req.params;
    const authorId = req.currentEmployee.id;

    try {
      const rows = await dbConnection.query(articleModel.findArtByAuth, [id, authorId]);

      if (rows.rowCount === 0) {
        res.status(status).json({
          status, success, message: 'Sorry, you can only delete your own article',
        });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, success: false, error: error.message });
    }

    try {
      status = 204;
      success = true;
      await dbConnection.query(articleModel.delArticle, [id]);

      return res.status(status).json({
        status, success, message: 'Article successfully deleted',
      });
    } catch (error) {
      return res.status(500).json({ status: 500, success: false, error: error.message });
    }


  }

  static async addComment(req, res) {
    return 'OK';
  }

  static async getArticle(req, res) {
    return 'OK';
  }

  static async flagArticle(req, res) {
    return 'OK';
  }
}

export default Article;
