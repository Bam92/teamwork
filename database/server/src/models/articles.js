const createArticleTable = `
CREATE TABLE IF NOT EXISTS article(
  id SERIAL PRIMARY KEY,
  title VARCHAR(128) UNIQUE NOT NULL,
  article TEXT NOT NULL,
  createdOn TIMESTAMP NOT NULL,
  authorId INTEGER NOT NULL,
  categoryId VARCHAR(25),
  FOREIGN KEY (authorId) REFERENCES employee (id)
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
const findAllArticles = 'SELECT * FROM article ORDER BY createdOn DESC';
const findArtByAuth = 'SELECT * FROM article WHERE id = $1 AND authorId = $2';
const delArticle = 'DELETE FROM article WHERE id = $1';

export default {
  createArticleTable,
  insertArticle,
  findArticle,
  findAllArticles,
  delArticle,
  findArtByAuth,
};
