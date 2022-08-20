require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');



const indexRouter = require('./routes/index');
const todosRouter = require('./routes/todos');
const statisticsRouter = require('./routes/statistics');

//initialize the redis-counter from the database
const { Todo } = require('./mongo');
const { setAsync } = require('./redis/index')
Todo.find({}).then(todos => {
  setAsync('added_todos', todos.length)
})

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);
app.use('/statistics', statisticsRouter);

module.exports = app;
