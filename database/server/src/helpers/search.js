import dbConnection from '../db/getConnection';
import articleModel from '../models/articles';

class Search {
  static async article(title) {
    const articleByTitle = await dbConnection.query(articleModel.findArticle, [title]);
    return articleByTitle;
  }
}

export default Search;
