const createArticleTable = `
CREATE TABLE IF NOT EXISTS article(
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) UNIQUE NOT NULL,
  article TEXT NOT NULL,
  createdOn DATA NOT NULL,
  authorId INT NOT NULL,
  categoryId VARCHAR(25)
  )`;

const insertArticle = `
INSERT INTO article(
  title,
  article,
  createdOn,
  authorId,
  categoryId
  ) VALUES($1, $2, $3, $4, $5) ON CONFLICT DO NOTHING RETURNING *`;

const findArticle = 'SELECT * FROM article WHERE title = $1';

export default {
  createArticleTable,
  insertArticle,
  findArticle,
};
