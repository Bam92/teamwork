import { articleSchema, updateSchema } from '../helpers/validateArtInput';
import { commentSchema } from '../helpers/validateCom';
import Search from '../helpers/search';
import { isValidId } from '../helpers/validateId';
import dbConnection from '../db/getConnection';
import articleModel from '../models/articles';
import commentModel from '../models/comments';

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
      if (addArticle.rowCount === 1) {
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
    let status = 400;
    let success = false;
    const { id } = req.params;
    const authorId = req.currentEmployee.id;

    const { error } = updateSchema(req.body);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }


    try {
      const rows = await dbConnection.query(articleModel.findArtByAuth, [id, authorId]);
      const { title } = req.body;
      const { article } = req.body;

      if (rows.rowCount === 0) {
        res.status(status).json({
          status, success, message: 'Sorry, this is not part of your articles',
        });
      }


      if (title) {
        status = 201;
        success = true;
        await dbConnection.query(articleModel.updateTitle, [title, id]);
        const targetArticle = await dbConnection.query(articleModel.findArticleById, [id]);

        return res.status(status).json({
          status, success, message: 'Title successfully edited', data: targetArticle.rows[0],
        });
      }

      if (article) {
        status = 201;
        success = true;
        await dbConnection.query(articleModel.updateBody, [article, id]);
        const targetArticle = await dbConnection.query(articleModel.findArticleById, [id]);


        return res.status(status).json({
          status, success, message: 'Body successfully edited', data: targetArticle.rows[0],
        });
      }
    } catch (error) {
      return res.status(status).json({ status, success, error: error.message });
    }
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
    let status = 400;
    let success = false;
    const { id } = req.params;

    if (isValidId(id)) {
      return res.status(status).json({
        status, success, error: 'Id must be an integer',
      });
    }

    const targetArticle = await dbConnection.query(articleModel.findArticleById, [id]);

    if (targetArticle.rowCount === 0) {
      status = 404;
      return res.status(status).json({
        status, success, error: 'Article does not exist',
      });
    }

    const { error } = commentSchema(req.body);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }

    try {
      status = 201,
      success = true;
      const { comment } = req.body;
      const dateCom = new Date();
      const authorId = req.currentEmployee.id;

      const { rows } = await dbConnection.query(commentModel.insertComment, [comment, id, authorId, dateCom]);

      const data = {
        createdOn: rows[0].createdon,
        articleTitle: targetArticle.rows[0].title,
        article: targetArticle.rows[0].article,
        comment: rows[0].comment,
      };
      res.status(status).json({
        status, success, message: 'Your comment was sussfully added', data,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, success: false, error: error.message });
    }
  }

  static async getArticle(req, res) {
    let status = 400;
    let success = false;
    const { id } = req.params;

    if (isValidId(id)) {
      return res.status(status).json({
        status, success, error: 'Id must be an integer',
      });
    }

    try {
      const targetArticle = await dbConnection.query(articleModel.findArticleById, [id]);

      if (targetArticle.rowCount === 0) {
        status = 404;
        return res.status(status).json({
          status, success, error: 'Article does not exist',
        });
      }

      status = 200;
      success = true;
      const comments = await dbConnection.query(commentModel.findArticleComment, [id]);
      const data = targetArticle.rows[0];
      data.comment = comments.rows;

      res.status(status).json({
        status, success, message: 'Detail about article', data,
      });
    } catch (error) {
      return res.status(500).json({ status: 500, success: false, error: error.message });
    }
  }

  static async flagArticle(req, res) {
    return 'OK';
  }
}

export default Article;
