import { articles_db, comments_db, getAll, getOne, getById, getCommentsByArticleId } from '../models/articles';
import article_lastId from '../helpers/ids';

const Article = {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async getArticles(req, res) {
    const success = true;
    const status = 200;
    const data = getAll();

    return res.status(status).json({ status, success, message: 'List of all articles sorted by date asc', data });

  },

  async createArticle(req, res) {
    let success = false;
    let status = 400;

   const { title, article } = req.body;

   if (title && article) {

    if (getOne(title) === undefined) {
      success = true;
      status = 201;

      const data = {
        _id: article_db.length + 1,
        createdOn: new Date(),
        title,
        article,
        authorId: req.currentEmployee._id
      };
     // article_lastId = article_lastId + 1;
    articles_db.push(data)

    return res.status(status).json({ status, success, message: 'Article successfully created', data });
  } else {
    return res.status(status).json({ status, success, error: 'Article already exists. Try again with another title' });
  }
   } else {
     return res.status(status).json({ status, success, error: 'title or article field not provided' });
   }

  },

  async updateArticle(req, res) {
    let success = false;
    let  status = 400;
    const id = req.params.id;

    const { title, article } = req.body;

    if (isNaN(id)) return res.status(status).json({ status, success, error: 'id must be a number' });

    if (!getById(id)) {
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

    if (title || article) {
      success = true;
      status = 201;

      const data = articles_db.filter(art => art._id === parseInt(id)).map(art => {
      art.updatedOn = new Date();
      if (title) art.title = title;
      if (article) art.article = article;

      return art;
    });

      return res.status(status).json({ status, success, message: 'article successfully edited', data });

    } else {
      return res.status(status).json({ status, success, error: 'title or article field not provided' });
    }

  },

  async deleteArticle(req, res) {
    let success = true;
    let  status = 200;
    const id = req.params.id;

    if (isNaN(id)) return res.status(status).json({ status, success, error: 'id must be a number' });

    const targetArt = getById(id)
    , indexArt = articles_db.indexOf(targetArt)
    ;

    if (!targetArt) {
      success = false;
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

   articles_db.splice([indexArt],1);

  console.log('db',  articles_db.length, articles_db)
return res.status(status).json({ status, success, message: 'article successfully deleted' });


  },

  async addComment(req, res) {
    let success = true;
    let  status = 201;
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

    const { title, article } = targetArt;
    const { comment } = req.body;
    const saveComment = { _id: comments_db.length + 1, createdOn: new Date(), articleId: id, authorId: req.currentEmployee._id, comment};

    comments_db.push(saveComment);

    console.log(getCommentsByArticleId(1), 'comments')

    if (!comment) {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'comment field is required' });
    }

    const data = { createdOn: new Date() + 1, articleTitle: title, article, comment };

    return res.status(status).json({ status, success, message: 'comment successfully added', data });
  },

  async getArticle(req, res) {
    let success = true;
    let  status = 201;
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

    const comments = getCommentsByArticleId(id)

    delete targetArt._id

    const data = targetArt;

    data.comments = comments;

    // console.log('comment for an article', getCommentsByArticleId(1))

    return res.status(status).json({ status, success, message: `all detail of article: ${id}`, data });
  }
};

export default Article;
