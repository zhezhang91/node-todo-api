const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/User', (err,client) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to MongoDB server!');
    const db = client.db('User');

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5b5b73fef4653049b3ca24ed")
    }, {
        $set : {
            name: 'zz'
        },
        $inc : {
            age: 10
        }
    }, {
        returnOriginal: false
    }).then(result => {
        console.log(result);
    })
})