const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// const message = {id: 'I am NO.3 user'};

// const hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`hash: ${hash}`);


// const data = {
//     id: 10
// };

// const token = jwt.sign(data, '123abc');
// console.log(token);

// const decoded = jwt.verify(token , '123abc');

// console.log('decoded data', decoded)
const password = '123abc!';

// bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         console.log(hash);
//     })
// })

const hashPassword = '$2a$10$MSplFE4RzxXScvU2qG0Uvu4S52jPjca2nxSPRWz709lgqCdLKpv/i';
bcrypt.compare(password, hashPassword, (err, res) => {
    console.log(res)
});