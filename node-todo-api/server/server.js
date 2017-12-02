var config = require('../config');

var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

const { ObjectID } = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

var app = express();
app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id,
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, err => {
        res.status(400).send(err);
    });
});

app.get('/todos', authenticate, (req, res) => {
    Todo
        .find({
            _creator: req.user._id
        })
        .then((todos) => {
            res.send({ todos });
        }, e => res.status(400).send(e));
});

app.get('/todos/:id', authenticate, (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    Todo
        .findOne({
            _id: id,
            _creator: req.user._id
        })
        .then((todo) => {
            if (!todo) {
                res.status(404).send();
            }

            res.send({ todo });
        }).catch(err => {
            res.status(400).send();
        });
});

app.delete('/todos/:id', authenticate, async (req, res) => {
    const id = req.params.id;
    if (!ObjectID.isValid(id)) {
        return res.sendStatus(404);
    }

    try {
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        });
        if (!todo) return res.sendStatus(404);

        return res.send({ todo });
    } catch (e) {
        res.status(400).send();
    }
});

app.patch('/todos/:id', authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        const body = _.pick(req.body, ['text', 'completed']);

        if (!ObjectID.isValid(id)) {
            return res.sendStatus(404);
        }

        if (_.isBoolean(body.completed) && body.completed) {
            body.completedAt = new Date().getTime();
        } else {
            body.completed = false;
            body.completedAt = null;
        }

        const todo = await Todo.findOneAndUpdate({
            _id: id,
            _creator: req.user._id
        }, {
                $set: body
            }, {
                new: true
            });
        if (!todo) {
            return res.sendStatus(404);
        }

        res.send({ todo })
    }
    catch (e) {
        res.sendStatus(400);
    }
});

app.post('/users', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = new User(body);
        await user.save();
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.sendStatus(400);
    }
});

app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

app.post('/users/login', async (req, res) => {
    try {
        const body = _.pick(req.body, ['email', 'password']);
        const user = await User.findByCredentials(body.email, body.password);
        const token = await user.generateAuthToken();
        res.header('x-auth', token).send(user);
    } catch (e) {
        res.sendStatus(400);
    }
});

app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token);
        res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(400);
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('TodoApp server started.');
});

module.exports = { app };
