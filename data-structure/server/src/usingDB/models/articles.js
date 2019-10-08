import { getCategoryById } from './categories';
import articles_db from '../data/articles';
import comments_db from '../data/comments';

const getOne = title => {
  return articles_db.find( article => article.title === title )
}

const getById = id => {
  return articles_db.find(article => article._id === parseInt(id))
}

const getCommentsByArticleId = id => comments_db.filter( comments => comments.articleId === parseInt(id) )

const getAll = () => {
  const sortedArticles =  articles_db.slice().sort((a, b) => b.createdOn - a.createdOn);
  sortedArticles.forEach(article => {
    const artTags = article.categoryId
    if (artTags != undefined) {
      const test = artTags.map(tagId => getCategoryById(tagId).name)
      article.categories = test.join(', ')
    } else article.categories = 'uncategorized'
  })

  return sortedArticles;
};

const getAllByTag = id => {
  id = parseInt(id)
  const listArticles = [];

  articles_db.find(article => {
  const listIds = article.categoryId
  if (listIds != undefined) {
    if(listIds.includes(id)) listArticles.push(article);
  }
})

return listArticles

}

export { comments_db, getAll, getOne, getById, getCommentsByArticleId, getAllByTag };
