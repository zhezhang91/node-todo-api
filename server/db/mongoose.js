const mongoose = require('mongoose');

// tell mongoose to use Promise
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports = {
   mongoose 
}