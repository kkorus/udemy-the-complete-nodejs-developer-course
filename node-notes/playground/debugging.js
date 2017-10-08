// nodemon inspect playgournd/debugging.js
// nodemon --inspect-brk playground/debugging (chrome://inspect)

var person = {
    name: 'Konrad'
};

person.name = 'Derrick';
person.lastname = 'Rose';

debugger;

console.log(person);