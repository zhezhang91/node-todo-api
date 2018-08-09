const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('../server');
const { Todo } = require('../models/todo');
const { User } = require('../models/user');
const { todos, populateTodos, users, populateUsers } = require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
    it('should create a new todo', done => {
        const text = 'Test todo text';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect(res => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find({ text })
                    .then(todos => {
                        expect(todos.length).toBe(1);
                        expect(todos[0].text).toBe(text);
                        done();
                    }).catch(e => done(e))
            });
    });

    it('should not create todo with invalid body data', done => {

        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Todo.find()
                    .then(todos => {
                        expect(todos.length).toBe(2);
                        done();
                    }).catch(e => done(e))
            })
    })
});

describe('GET /todos', () => {
    it('should get all todos', done => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect(res => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done)
    })
})

describe('GET /todos/:id', () => {
    it('should return todo doc', done => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect(res => {
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end(done)
    });

    it('should return 404 if todo not found', done => {
        const testId = new ObjectID();

        request(app)
            .get(`/todos/${testId.toHexString()}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if id not corret', done => {
        request(app)
            .get('/todos/123')
            .expect(404)
            .end(done)
    })
})

describe('DELETE /todos/:id', () => {

    it('should return delete todo doc', done => {
        const hexId = todos[0]._id.toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect(res => {
                //    console.log('DELETE@@@@@', JSON.stringify(res, null, 2))
                expect(res.body.todo.text).toBe(todos[0].text)
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.findById(hexId).then(todo => {
                    expect(todo).toBeFalsy();
                    done();
                }).catch(e => done(e))
            })
    });

    it('should return 404 if not found', done => {
        const hexId = new ObjectID().toHexString();

        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done)
    });

    it('should return 404 if objID is invalid', done => {
        request(app)
            .delete('/todos/123')
            .expect(404)
            .end(done)
    })
})

describe('UPDATE /todos/:id', () => {
    it('should return updated todo doc', done => {

        const hexId = todos[0]._id.toHexString();
        const text = 'This should be the new text';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: true,
                text
            })
            .expect(200)
            .expect(res => {
                //console.log('@@@@@@',JSON.stringify(res, null, 2))
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end(done);
    })
    it('should clear completedAt when todo is not completed', done => {
        const hexId = todos[1]._id.toHexString();
        const text = 'This should be the new text!!!';

        request(app)
            .patch(`/todos/${hexId}`)
            .send({
                completed: false,
                text
            })
            .expect(200)
            .expect(res => {
                //console.log('@@@@@@',JSON.stringify(res, null, 2))
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end(done);
    })
})

describe('GET /users/me', () => {
    it('should return user if authenticated', done => {
        request(app)
            .get('/users/me')
            .set('x-auth', users[0].tokens[0].token)
            .expect(200)
            .expect(res => {
                expect(res.body._id).toBe(users[0]._id.toHexString());
                expect(res.body.email).toBe(users[0].email);
            })
            .end(done);
    })

    it('shoud return 401 if not authenticated', done => {
        request(app)
            .get('/users/me')
            .expect(401)
            .expect(res => {
                expect(res.body).toEqual({});
            })
            .end(done);
    })
})

describe('POST /users', () => {
    it('should create a user', done => {

        const email = 'example@example.com';
        const password = '123abc!';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .expect(res => {
                expect(res.headers['x-auth']).toBeTruthy();
                expect(res.body._id).toBeTruthy();
                expect(res.body.email).toBe(email);
            })
            .end((err) => {
                if (err) {
                    return done(err)
                }
                User.findOne({ email }).then(user => {
                    expect(user).toBeTruthy();
                    expect(user.password).not.toBe(password);
                    done();
                })
            })
    })

    it('should return validation errors if request invalid', done => {
        const email = 'e322f';
        const password = '123';

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(400)
            .end(done)
    })


    it('should not create user if email in use', done => {

        request(app)
            .post('/users')
            .send(users[0].email, users[0].password)
            .expect(400)
            .end(done);
    })
})