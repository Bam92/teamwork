const createCommentTable = `
CREATE TABLE IF NOT EXISTS comment(
  id SERIAL PRIMARY KEY,
  comment VARCHAR(128) NOT NULL,
  articleId INTEGER NOT NULL,
  authorId INTEGER NOT NULL,
  createdOn TIMESTAMP NOT NULL,
  FOREIGN KEY (articleId) REFERENCES article (id),
  FOREIGN KEY (authorId) REFERENCES employee (id)
  )`;

const insertComment = `
INSERT INTO comment(
  comment,
  articleId,
  authorId,
  createdOn
  ) VALUES($1, $2, $3, $4) RETURNING *`;

const findArticleComment = 'SELECT * FROM comment WHERE articleId = $1';

export default {
  createCommentTable,
  insertComment,
  findArticleComment,
};
