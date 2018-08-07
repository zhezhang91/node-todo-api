const { ObjectID } = require('mongodb');
const { mongoos } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

//Todo.remove({})
// remove all
Todo.remove({}).then(result => {
    console.log(result);
})

//remove one
//Todo.findOneAndRemove()

// remove by id

//Todo.findByIdAndRemove('dfaf').then()