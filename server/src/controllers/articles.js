import { articles_db, getAll } from '../models/articles';

const Article = {
  /**
   * Create a new Employee
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  getArticles(req, res) {
    const success = true;
    const status = 200;
    const data = getAll();

    return res.status(status).json({ status, success, message: 'List of all articles sorted by date asc', data });

  },
};

export default Article;
