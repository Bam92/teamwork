const articles_db = [
  {
    _id: 1,
     createdOn: new Date('2019-7-24'),
     title: 'Welcome to Andela',
     article: 'Lorem ispismma,l,sl;,l',
     authorId: 2
  },
  {
    _id: 2,
     createdOn: new Date('2019-8-26'),
     title: 'Congo',
     article: 'Lorem ispismma,l,sl;,l',
     authorId: 2
  },
  {
    _id: 3,
     createdOn: new Date('2019-7-25'),
     title: 'Yoyo',
     article: 'Lorem ispismma,l,sl;,l',
     authorId: 1
  }
];

const comments_db = [
  {
    _id: 1,
     createdOn: new Date('2019-7-24'),
     articleId: 3,
     authorId: 2,
     comment: 'Just a comment'
  },
  {
    _id: 2,
    createdOn: new Date('2019-7-24'),
    articleId: 2,
    authorId: 2,
    comment: 'Just a comment'
  },
  {
    _id: 3,
    createdOn: new Date('2019-7-24'),
    articleId: 1,
    authorId: 1,
    comment: 'Just a jkjjkljkljklq nnkjnkljklqjs =lkkkpopk'
  },
  {
    _id: 4,
    createdOn: new Date('2019-7-24'),
    articleId: 2,
    authorId: 2,
    comment: 'Just a Test to make sureeeeeeeeeeeeeee oh lallalalalal'
  }
];

const getOne = title => {
  return articles_db.find( article => article.title === title )
}

const getById = id => {
  return articles_db.find( article => article._id === parseInt(id) )
}

const getCommentsByArticleId = id => comments_db.filter( comments => comments.articleId === parseInt(id) )

const getAll = () => {
  const sortedArticles =  articles_db.slice().sort((a, b) => b.createdOn - a.createdOn);
  return sortedArticles;
}

export { articles_db, comments_db, getAll, getOne, getById, getCommentsByArticleId };
