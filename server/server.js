const mongoose = require('mongoose');

// tell mongoose to use Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

// save new something
// const Todo = mongoose.model('Todo', {
//     text: {
//         type: String,
//         required: true,
//         minlength: 2,
//         trim: true
//     },
//     completed: {
//         type: Boolean,
//         default: false
//     },
//     completedAt: {
//         type: Number,
//         default: null
//     }
// });

// const newTodo = new Todo({
//     text: 'Cook dinner'
// });

// newTodo.save().then( result => {
//     console.log('Saved todo', result)
// }).catch(e => console.log('Unable to save todo'));

// const secondTodo = new Todo({
//     text: '  edfs  ',

// });

// secondTodo.save().then(result => {
//     console.log('saved secondTodo', JSON.stringify(result, null, 2))
// })
// .catch(e => console.log(e))

//user 
//email- require - trim - type: string- minlength: 1
const user = mongoose.model('User', {
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    }
})

const kim = new user({
    email: 'zz188@gamil.com'
})

kim.save().then(result => console.log('saved to db', JSON.stringify(result, null, 2))).catch(e => console.log(e));