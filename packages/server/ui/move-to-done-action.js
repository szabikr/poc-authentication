const { updateTodo } = require('../db/todos-collection')

async function moveToDoneAction(req, res) {
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
  moveToDoneAction
}
