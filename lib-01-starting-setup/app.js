const customers = ['John', 'Jane', 'Jim', 'Jill', 'Jack', 'Jenny', 'Jen'];
const activeCustomers = ['Jane', 'Jim', 'Jill', 'Jack', 'Jenny', 'Jen'];

// const inactiveCustomers = customers.filter(customer => !activeCustomers.includes(customer));  

const inactiveCustomers = _.difference(customers, activeCustomers);
console.log(inactiveCustomers);