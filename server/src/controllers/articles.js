import { articles_db, getAll, getOne, getById } from '../models/articles';

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
        _id: articles_db.length + 1,
        createdOn: new Date(),
        title,
        article,
        authorId: req.currentEmployee._id
      };

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

  }
};

export default Article;
