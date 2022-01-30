const { readTodos, updateTodo } = require('./db')

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

async function moveToDone(req, res) {
  if (!req.query.todos) {
    return res.redirect('/todos')
  }

  if (!Array.isArray(req.query.todos)) {
    req.query.todos = [req.query.todos]
  }
  
  const promises = req.query.todos.map(async id => {
    const completed = true
    await updateTodo(id, completed)
    console.log(`todo item ${id} is moved to done`)
  })

  await Promise.all(promises)

  return res.redirect('/todos')
}

module.exports = {
  todosPage,
  moveToDone,
}
