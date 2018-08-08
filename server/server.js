require('./config/config');

const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const {mongoose} = require('./db/mongoose');


const app = new express();

//set env for Heroku
const port = process.env.PORT || 4000;

// apply middleware, transfer json to obj
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    console.log(req.body);
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then(result => {
        res.send(result);
    })
        .catch(e => res.status(400).send(e));
})

app.get('/todos', (req, res) => {
    Todo.find().then(todos => {
        res.send({
            todos,
        })
    })
        .catch(e => {
            res.status(400).send(e)
        })
})

app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo })
    })
        .catch(e => res.status(400).send())
});

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo })
    })
        .catch(e => res.status(404).send())
});

app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;

    const body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true }).then(todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({ todo });
    }).catch(e => res.status(400).send())

});

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    user.save().then( () => {
        return user.generateAuthToken();
    }).then(token => {
        res.header('x-auth', token).send(user)
    }).catch(e => res.status(400).send(e));
})


app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = { app };
