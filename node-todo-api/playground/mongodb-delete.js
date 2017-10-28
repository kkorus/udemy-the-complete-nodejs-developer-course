const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDB server');
    }

    console.log('Connected to MongoDB server');

    // delte many
    db.collection('Todos')
        .deleteMany({ text: 'Eat lunch' })
        .then((result) => {
            console.log(result);
        });

    // delete one
    db.collection('Todos')
        .deleteOne({ text: 'Eat lunch' })
        .then((result) => {
            console.log(result);
        });

    // findOneAndDelete
    db.collection('Todos')
        .findOneAndDelete({ text: 'Eat lunch' })
        .then((result) => {
            console.log(result);
        });

    db.collection('Users')
        .deleteMany({ name: 'Konrad' })
        .then((result) => {
            console.log(result);
        });

    db.collection('Users')
        .findOneAndDelete({ _id: new ObjectId('59f48a4c77dd4a4053979f53') })
        .then((result) => {
            console.log(result);
        });

});

