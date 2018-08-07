const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const { mongoose } = require('./db/mongoose');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');

const app = new express();

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

app.get('/todos/:id', (req,res) => {
    const id = req.params.id;

    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    Todo.findById(id).then( todo => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo})
    })
    .catch(e => res.status(400).send())
})

app.listen(4000, () => {
    console.log('Started on port 4000');
});

module.exports = { app };
