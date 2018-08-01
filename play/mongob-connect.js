// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //    text: 'Something doing',
    //    completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert todo', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    // const db = client.db('User');
    // db.collection('Users').insertOne({
    //    name: 'Andrew',
    //    age: 25,
    //    location: 'Ottawa'
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert user', err)
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // })

    db.collection('Todos').find().count().then( (count) => {
        console.log(`Todos count: ${count}`);
    //    console.log(JSON.stringify(, undefined, 2));
    }, (err) => {
        console.log(err)
    })

    // client.close();
})