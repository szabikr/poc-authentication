const { readTodos } = require('./db')

const renderTodos = (todos) => {
  if (!todos) {
    return `No todos are available`
  }

  return todos.reduce((view, todo) => `
    ${view}
    <p>${todo.content}</p>
  `, '')
}

async function todosPage(req, res) {
  const todos = await readTodos()
  
  return res.send(`
    <h1>Your Todos</h1>
    <div>
      ${renderTodos(todos)}
    </div>
  `)
}

module.exports = {
  todosPage,
}
