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

const getOne = title => {
  return articles_db.find( article => article.title === title )
}

const getAll = () => {
  const sortedArticles =  articles_db.slice().sort((a, b) => b.createdOn - a.createdOn);
  return sortedArticles;
}

export { articles_db, getAll, getOne };
