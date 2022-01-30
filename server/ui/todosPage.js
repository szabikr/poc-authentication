const { readTodos } = require('../db')

const renderTodo = ({ id, content, completed }) => `
  <div>
    <input type="checkbox" id="todo-${id}" name="todos" value="${id}" ${completed ? 'checked' : ''}>
    <label for="todo-${id}">${content}</label>
  </div>
`

const renderTodos = (todos) => {
  if (!todos) {
    return `No todos are available`
  }

  return todos.reduce((view, todo) => `${view}${renderTodo(todo)}`, '')
}

async function todosPage(req, res) {
  const todos = await readTodos()
  
  return res.send(`
    <h1>Your Todos</h1>
    <form action="/move-to-done">
      ${renderTodos(todos)}
      <input type="submit" value="Move to Done" />
    </form>
  `)
}

module.exports = {
  todosPage,
}
