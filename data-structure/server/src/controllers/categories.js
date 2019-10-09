import { getAllByTag } from '../models/articles';
import { getCategoryById } from '../models/categories';

class Category {
  static getArticlesByTag(req, res) {
    let success = true;
    let status = 200;
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).json({ status: 400, success: false, error: 'id must be a number' });

    if (!getCategoryById(id)) {
      status = 404;
      success = false;
      return res.status(status).json({ status, success, error: `category with id ${id} does not exist` });
    }

    const data = getAllByTag(id);

    return res.status(status).json({ status, success, message: `List of all articles that matches category id ${id}`, data });

  }
}

export default Category;

