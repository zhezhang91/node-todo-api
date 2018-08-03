const mongoose = require('mongoose');

// tell mongoose to use Promise
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
   mongoose 
}