import connection from './getConnection';
import employee from '../models/employee';

const createUserTest = async () => {
  const testUser = employee.insertEmployee;

  try {
    await connection.query(testUser, ['test@teamwork.com', 'Test', 'Test', 'Test@2018']);
  } catch (error) {
    return error
  }
};

createUserTest();

export default createUserTest;
