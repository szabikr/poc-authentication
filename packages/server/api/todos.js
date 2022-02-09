const { v4: uuidv4 } = require('uuid')
const {
  readTodo, readTodos, createTodo, updateTodo, deleteTodo, resetAllTodos,
} = require('../db/todos-collection')

async function getTodoHandler(req, res) {
  if (!req.params.id) {
    return res.status(400).end('Invalid Request')
  }

  const todo = await readTodo(req.params.id)
  return res.send(todo)
}

async function postTodoHandler(req, res) {
  if (!req.body || !req.body.content || req.body.content === '') {
    return res.status(400).end('Invalid Request Body')
  }
  
  const id = uuidv4()
  const success = await createTodo({
    id,
    content: req.body.content,
  })
  
  if (!success) {
    return res.status(500).end('Internal server error')
  }
  
  return res.json({ id: id })
}

async function putTodoHandler(req, res) {
  if (!req.params.id) {
    return res.status(400).end('Invalid Request')
  }
  
  const todo = await readTodo(req.params.id)
  
  if (!todo) {
    return res.status(404).end(`Todo with id: ${req.params.id} does not exist`)
  }
  
  const completed = todo.completed ? false : true
  const success = await updateTodo(req.params.id, completed)
  
  if (!success) {
    return res.status(500).end('Internal server error')
  }
  
  return res.json({
    ...todo,
    completed
  });
}

async function deleteTodoHandler(req, res) {
  if (!req.params.id) {
    return res.status(400).end('Invalid Request')
  }
  
  const success = await deleteTodo(req.params.id)
  
  if (!success) {
    return res.status(404).end('Record was not found')
  }
  
  return res.status(200).end();
}


async function getTodosHandler(req, res) {
  const todos = await readTodos()
  return res.send(todos)
}

async function resetTodosHandler(req, res) {
  const success = await resetAllTodos()

  if (!success) { 
    return res.send('no todos are to be reset in the database')
  }

  return res.status(200).send('todos have been reset')
}

module.exports = {
  getTodoHandler,
  postTodoHandler,
  putTodoHandler,
  deleteTodoHandler,
  
  getTodosHandler,
  resetTodosHandler,
}
