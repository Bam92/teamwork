const createCommentTable = `
CREATE TABLE IF NOT EXISTS comment(
  id SERIAL PRIMARY KEY,
  comment VARCHAR(128) NOT NULL,
  articleId INTEGER NOT NULL,
  FOREIGN KEY (articleId) REFERENCES article (id)
  )`;

const insertComment = `
INSERT INTO comment(
  comment,
  articleId
  ) VALUES($1, $2) RETURNING *`;

const findArticleComment = 'SELECT * FROM comment WHERE articleId = $1';

export default {
  createCommentTable,
  insertComment,
  findArticleComment,
};
