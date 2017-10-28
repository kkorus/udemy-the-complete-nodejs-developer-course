const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    db.collection('Todos')
        .findOneAndUpdate(
        {
            _id: new ObjectId('59f48c9b77dd4a405397a069')
        },
        {
            $set:
            {
                completed: true
            }
        },
        {
            returnOriginal: false
        })
        .then(result => {
            console.log(result);
        });

    db.collection('Users')
        .findOneAndUpdate(
        {
            name: 'John'
        },
        {
            $set:
            {
                name: 'Konrad',
            },
            $inc: {
                age: 1
            }
        },
        {
            returnOriginal: false
        })
        .then(result => {
            console.log(result);
        });
});

