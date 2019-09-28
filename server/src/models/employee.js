const employee_db = [
  {
    _id: 1,
    firstName: 'Sarah',
     lastName: 'Lifaefi',
     email: 'sarah.lif@gmail.com',
     password: '$2b$10$tmoQZ9e8OL/nyGFydFXBVOWHMnp2CNxMdoE6u6zb2CWlZmiOtniRS', //S@rah123
     gender: 'female',
     jobRole: 'employee',
     department:'talent',
     address: '12, KG 569 St'
  }
];

const getOne = email => {
  return employee_db.find( employee => employee.email === email )
}

const userExist = (email, password) => {
  employee_db.filter( employee => employee.email === email && employee.password === password )
}
console.log('kkkkkkd', userExist('sarah.lif@gmail.com', 'S@rah123'))
// const userExist = (email, password) => {
//   for (let user of employee_db) {
//     console.log('user ', user)
//     if (user.email === email && user.password === password) return user;
//   }
// }


export { employee_db, getOne, userExist };
