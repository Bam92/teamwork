const employee_db = [
  {
    firstName: 'Sarah',
     lastName: 'Lifaefi',
     email: 'sarah.lif@gmail.com',
     password: 'S@ra123',
     gender: 'female',
     jobRole: 'employee',
     department:'talent',
     address: '12, KG 569 St'
  }
];

const getOne = email => {
  return employee_db.find( employee => employee.email === email )
}

export { employee_db, getOne };
