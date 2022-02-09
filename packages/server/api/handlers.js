const {
  getTodoHandler,
  postTodoHandler,
  putTodoHandler,
  deleteTodoHandler,
  
  getTodosHandler,
  resetTodosHandler,
} = require('./todos')

const {
  completeTodoHandler,
} = require('./complete-todo')

module.exports = {
  getTodoHandler,
  postTodoHandler,
  putTodoHandler,
  deleteTodoHandler,
  
  getTodosHandler,
  resetTodosHandler,
  
  completeTodoHandler,
}