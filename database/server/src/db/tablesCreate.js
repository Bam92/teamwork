import connection from './getConnection';
import article from '../models/articles';
import employee from '../models/employee';
import comment from '../models/comments';

const createAllTables = async () => {
  const articlesTable = article.createArticleTable;
  const emplyeesTable = employee.createEmployeeTable;
  const commentsTable = comment.createCommentTable;

  const allTables = `${emplyeesTable}; ${articlesTable}; ${commentsTable}`;

  await connection.query(allTables);
};

createAllTables();

export default createAllTables;
