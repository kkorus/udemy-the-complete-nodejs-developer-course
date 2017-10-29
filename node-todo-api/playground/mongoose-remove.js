const { ObjectId } = require('mongodb');
const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');

var id = '59f4c56422a57e1688ce8203';

Todo.remove({}).then(result => {
    console.log(result);
});

Todo.findOneAndRemove({ _id: id }).then(todo => {
});

Todo.findByIdAndRemove(id).then(todo => {
});
