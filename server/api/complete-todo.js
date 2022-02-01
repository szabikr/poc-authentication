const { v4: uuidv4 } = require('uuid')
const { readTodo } = require('../db/todos-collection')
const { createCompletedTodo } = require('../db/completed-todos-collection')

async function completeTodoHandler(req, res) {
  if (!req.params.id) {
    return res.status(400).end('Invalid Request')
  }

  const todo = await readTodo(req.params.id)

  if (!todo) {
    return res.status(404).end('Todo not yet avaialbe')
  }

  const id = uuidv4()
  const when = new Date()
  const completedTodo = {
    id,
    when,
    todoId: todo.id,
    name: todo.content,
  }

  const success = createCompletedTodo(completedTodo)

  if (!success) {
    return res.status(500).end('Internal server error')
  }

  return res.json({ id, when })
}

module.exports = {
  completeTodoHandler,
}
