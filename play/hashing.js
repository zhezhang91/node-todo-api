const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

// const message = {id: 'I am NO.3 user'};

// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);


const data = {
    id: 10
};

const token = jwt.sign(data, '123abc');
console.log(token);

const decoded = jwt.verify(token , '123abc');

console.log('decoded data', decoded)

