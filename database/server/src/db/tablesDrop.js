import connection from './getConnection';

const dropAllTables = async () => {
  await connection.query('DROP TABLE IF EXISTS comment; DROP TABLE IF EXISTS article; DROP TABLE IF EXISTS employee');
};

dropAllTables();

export default dropAllTables;
