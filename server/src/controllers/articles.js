import { comments_db, getAll, getOne, getById, getCommentsByArticleId } from '../models/articles';
import { getCategoryByName } from '../models/categories';
import categories  from '../data/tags';
import articles from '../data/articles';
import flaggedArt from '../data/flaggedArt';
import isFlagged  from '../models/flaggedArt';

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

    const { title, article, category } = req.body;

   if (title && article) {
    if (getOne(title) === undefined) {
      success = true;
      status = 201;

      const tagId = []

      if (category) {
        const tags = category.split(', ');
        tags.map(tag => {
            getCategoryByName(tag)
            if (getCategoryByName(tag) != undefined) tagId.push(getCategoryByName(tag).id)
            else {
              const newTag = {id: categories.length + 1, name: tag}
              categories.push(newTag)
              tagId.push(newTag.id)
            }
          })
          }

      const data = {
        _id: articles.length + 1,
        title,
        article,
        createdOn: new Date(),
        authorId: req.currentEmployee._id,
        categoryId: tagId
      };
    articles.push(data)

    return res.status(status).json({ status, success, message: 'Article successfully created', data });
  } else {
    status = 409;
    return res.status(status).json({ status, success, error: 'Article already exists. Try again with another title' });
  }
   } else {
     return res.status(status).json({ status, success, error: 'title or article field not provided' });
   }
  },

  async updateArticle(req, res) {
    let success = false;
    let  status = 400;
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

        const data = articles.filter(art => art._id === parseInt(id)).map(art => {
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
    const { id } = req.params;

    if (isNaN(id)) return res.status(400).json({ status: 400, success: false, error: 'id must be a number' });

    const targetArt = getById(id)
    , indexArt = articles.indexOf(targetArt)
    ;

    if (!targetArt) {
      success = false;
      status = 404;
      return res.status(status).json({ status, success, error: `article with id ${id} does not exist` });
    }

   articles.splice([indexArt],1);

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
    const saveComment = { _id: comments_db.length + 1, createdOn: new Date(), articleId: id, authorId: req.currentEmployee._id, comment };

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
  },

  async flagArticle(req, res) {
    let success = true;
    let  status = 201;
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

      flaggedArt.push(flagged)

      return res.status(status).json({ status, success, message: `article with id ${id} successfully flagged` });
    }
    else {
      success = false;
      status = 400;
      return res.status(status).json({ status, success, error: 'Please state the reason why you want to flag this article' });
    }
  }
};

export default Article;
