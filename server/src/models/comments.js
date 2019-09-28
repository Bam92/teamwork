import comments_db from '../data/comments';

const getById = id => {
  return comments_db.find(comment => comment._id === parseInt(id))
}

export { getById };
