const { ObjectID } = require('mongodb');
const { mongoos } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

const id = '5b6478205c29e07e28d5e07d';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid')
}

// Todo.find({
//     _id: id
// }).then( todos => {
//     console.log('Todos', todos)
// });

// Todo.findOne({
//     _id: id
// }).then( todo => {
//     console.log('Todo', todo)
// });

// Todo.findById(id).then(todo => {
//     if (!todo) {
//         return console.log('Id not exist')
//     }
//     console.log('Todo By Id', todo)
// }).catch(e => console.log(e));

User.findById(id).then(user => {
    if(!user) {return console.log('User not found')}
    console.log(JSON.stringify(user,null,2))})
    .catch(e => console.log(e));