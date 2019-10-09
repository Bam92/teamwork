import connection from './getConnection';
import article from '../models/articles';
import employee from '../models/employee';

const createAllTables = async () => {
  const articlesTable = article.createArticleTable;
  const emplyeesTable = employee.createEmployeeTable;

  const allTables = `${emplyeesTable}; ${articlesTable}`;

  await connection.query(allTables);
};

createAllTables();

export default createAllTables;
