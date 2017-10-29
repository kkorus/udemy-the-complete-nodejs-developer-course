var config = require('../config');

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    var todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos });
    }, e => {
        res.status(400).send(e);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo
        .findById(id)
        .then((todo) => {
            if (!todo) {
                res.status(404).send();
            }

            res.send({ todo });
        }).catch(err => {
            res.status(400).send();
        });
});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo
        .findByIdAndRemove(id)
        .then((todo) => {
            if (!todo) {
                res.status(404).send();
            }

            res.send({ todo });
        }).catch(err => {
            res.status(400).send();
        });
});

app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo
        .findByIdAndUpdate(id, {
            $set: body
        }, {
            new: true
        }).then(todo => {
            if (!todo) {
                res.status(404).send();
            }

            res.send({ todo });
        }).catch(err => res.status(400).send());

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('TodoApp server started.');
});

module.exports = { app };
