import { articles_db, getAll, getOne } from '../models/articles';

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
     return res.status(status).json({ status, success, error: 'title or article fields not provided' });
   }

  }
};

export default Article;
