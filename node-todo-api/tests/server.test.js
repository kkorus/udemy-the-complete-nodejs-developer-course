const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../server/server');
const { Todo } = require('../server/models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'First todo text'
}, {
    _id: new ObjectID(),
    text: 'Second todo text',
    completed: true,
    completedAt: 333
}];

beforeEach(done => {
    Todo
        .remove({})
        .then(() => Todo.insertMany(todos))
        .then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find({ text }).then(todos => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch(e => done(e));
            });
    });

    it('should not create todo with invalid body data', done => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return console.log(err);
                }

                Todo.find().then(todos => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch(e => done(e));
            });
    });

    describe('GET /todos', () => {
        it('should get all todos', done => {
            request(app)
                .get('/todos')
                .expect(200)
                .expect(res => {
                    expect(res.body.todos.length).toBe(2);
                })
                .end(done);
        });
    });

    describe('GET /todos/:id', () => {
        it('should return todo by id', done => {
            request(app)
                .get(`/todos/${todos[0]._id.toHexString()}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.todo.text).toBe(todos[0].text);
                })
                .end(done);
        });

        it('should return 404 if todo not found', done => {
            var id = new ObjectID().toHexString();

            request(app)
                .get(`/todos/${id}`)
                .expect(404)
                .end(done);
        });

        it('should return 404 for non-object ids', done => {
            var id = 123;

            request(app)
                .get(`/todos/${id}`)
                .expect(404)
                .end(done);
        });
    });

    describe('DELETE /todos/:id', () => {
        var id = todos[0]._id.toHexString();

        it('should delete todo by id', done => {
            request(app)
                .delete(`/todos/${id}`)
                .expect(200)
                .expect(res => {
                    expect(res.body.todo.text).toBe(todos[0].text)
                })
                .end((err, res) => {
                    if (err) {
                        return console.log(err);
                    }

                    Todo.findById(id).then(todo => {
                        expect(todo).toNotExist();
                        done();
                    }).catch(e => done(e));
                });
        });

        it('should return 404 if todo not found', done => {
            var id = new ObjectID().toHexString();

            request(app)
                .delete(`/todos/${id}`)
                .expect(404)
                .end(done);
        });

        it('should return 404 for non-object ids', done => {
            var id = 123;

            request(app)
                .delete(`/todos/${id}`)
                .expect(404)
                .end(done);
        });
    });

    describe('PATCH /todos/:id', () => {
        it('should update the todo', done => {

            var id = todos[0]._id.toHexString();
            var bodyToUpdate = {
                completed: true,
                text: 'Text from test'
            };

            request(app)
                .patch(`/todos/${id}`)
                .send(bodyToUpdate)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Todo.findById(id)
                        .then(todo => {
                            expect(todo.text).toBe(bodyToUpdate.text);
                            expect(todo.completed).toBe(true);
                            expect(todo.completedAt).toBeA('number');
                            done();
                        })
                        .catch(err => done(err));
                });
        });

        it('should clear completedAt when todo is not completed', done => {
            var id = todos[1]._id.toHexString();
            var bodyToUpdate = {
                completed: false,
                text: 'Text from test'
            };

            request(app)
                .patch(`/todos/${id}`)
                .send(bodyToUpdate)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }

                    Todo.findById(id)
                        .then(todo => {
                            expect(todo.text).toBe(bodyToUpdate.text);
                            expect(todo.completed).toBe(false);
                            expect(todo.completedAt).toNotExist();
                            done();
                        })
                        .catch(err => done(err));
                });
        });
    });
});