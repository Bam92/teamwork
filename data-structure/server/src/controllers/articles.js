import {
  comments_db, getAll, getOne, getById, getCommentsByArticleId,
} from '../models/articles';
import { saveCategories } from '../models/categories';
import articles from '../data/articles';
import flaggedArt from '../data/flaggedArt';
import isFlagged from '../models/flaggedArt';
import { articleSchema } from '../../helpers/validateArtInput';

class Article {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  static getArticles(req, res) {
    const success = true;
    const status = 200;
    const data = getAll();

    return res.status(status).json({
      status, success, message: 'List of all articles sorted by date asc', data,
    });
  }

  static createArticle(req, res) {
    let success = false;
    let status = 400;

    const articleInfo = req.body;
    console.log('body here', articleInfo)
    const { title, article, category } = articleInfo;
    const { error } = articleSchema(articleInfo);

    if (error) {
      const errorMessage = error.details[0].message;

      return res.status(status).json({ status, success, error: errorMessage });
    }

    if (getOne(title) === undefined) {
      success = true;
      status = 201;
      let tagId;

      if (category) tagId = saveCategories(category);
      const data = {
        _id: articles.length + 1,
        title,
        article,
        createdOn: new Date(),
        authorId: req.currentEmployee._id,
        categoryId: tagId,
      };

      articles.push(data);

      return res.status(status).json({
        status, success, message: 'Article successfully created', data,
      });
    }
    status = 409;
    return res.status(status).json({ status, success, error: 'Article already exists. Try again with another title' });
  }

  static updateArticle(req, res) {
    let success = false;
    let status = 400;
    const { id } = req.params;

    const { title, article } = req.body;

    if (isNaN(id)) return res.status(status).json({ status, success, error: 'id must be a number' });

    if (!getById(id)) {
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

    if (title || article) {
      success = true;
      status = 201;

      const data = articles.filter((art) => art._id === parseInt(id)).map((art) => {
        art.updatedOn = new Date();

        if (title) art.title = title;
        if (article) art.article = article;

        return art;
      });

      return res.status(status).json({
        status, success, message: 'article successfully edited', data,
      });
    }
    return res.status(status).json({ status, success, error: 'title or article field not provided' });
  }

  static deleteArticle(req, res) {
    let success = true;
    let status = 200;
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).json({ status: 400, success: false, error: 'id must be a number' });

    const targetArt = getById(id);
    const indexArt = articles.indexOf(targetArt);
    if (!targetArt) {
      success = false;
      status = 404;

      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

    articles.splice([indexArt], 1);

    return res.status(status).json({ status, success, message: 'article successfully deleted' });
  }

  static addComment(req, res) {
    let success = true;
    let status = 201;
    const { id } = req.params;
    const targetArt = getById(id);

    if (isNaN(id)) {
      success = false;
      status = 400;

      return res.status(status).json({ status, success, error: 'id must be an integer' });
    }

    if (!targetArt) {
      success = false;
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

    const { title, article } = targetArt;
    const { comment } = req.body;
    const saveComment = {
      _id: comments_db.length + 1, createdOn: new Date(), articleId: id, authorId: req.currentEmployee._id, comment,
    };

    comments_db.push(saveComment);

    if (!comment) {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'comment field is required' });
    }

    if (comment.length <= 0) {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'comment is empty' });
    }

    const data = {
      createdOn: new Date() + 1, articleTitle: title, article, comment,
    };

    return res.status(status).json({
      status, success, message: 'comment successfully added', data,
    });
  }

  static getArticle(req, res) {
    let success = true;
    let status = 201;
    const { id } = req.params;

    if (isNaN(id)) {
      success = false;
      status = 400;

      return res.status(status).json({ status, success, error: 'id must be an integer' });
    }

    const targetArt = getById(id);

    if (!targetArt) {
      success = false;
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

    const comments = getCommentsByArticleId(id);

    delete targetArt._id;

    const data = targetArt;

    data.comments = comments;

    return res.status(status).json({
      status, success, message: `all detail of article: ${id}`, data,
    });
  }

  static flagArticle(req, res) {
    let success = true;
    let status = 201;
    const { id } = req.params;
    const { reason } = req.body;

    if (isNaN(id)) {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'id must be an integer' });
    }

    const targetArt = getById(id);

    if (!targetArt) {
      success = false;
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

    if (isFlagged(id)) {
      success = false;
      status = 409;
      return res.status(status).json({ status, success, error: `article with id ${id} is already flagged` });
    }

    if (reason) {
      const flagged = { _id: flaggedArt.length + 1, articleId: parseInt(id), reason };

      flaggedArt.push(flagged);

      return res.status(status).json({ status, success, message: `article with id ${id} successfully flagged` });
    }

    success = false;
    status = 400;
    return res.status(status).json({ status, success, error: 'Please state the reason why you want to flag this article' });
  }
}

export default Article;
