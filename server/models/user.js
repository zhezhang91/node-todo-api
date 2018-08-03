//user 
//email- require - trim - type: string- minlength: 1
const mongoose = require('mongoose');

const User = mongoose.model('User', {
    email: {
        type: String,
        minlength: 1,
        trim: true,
        required: true
    }
});

module.exports = {User};