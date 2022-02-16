const path = require('path')
const express = require('express')
const loggerMiddleware = require('./logger-middleware')
const apiHandlers = require('./api/handlers')
const uiHandlers = require('./ui/handlers')
const { postUserRegister } = require('./api/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(loggerMiddleware)
app.use(express.static(path.join(__dirname, '../../client/build')))

app.post('/api/user/register', postUserRegister)

app.get('/api/todo/:id', apiHandlers.getTodoHandler)
app.post('/api/todo', apiHandlers.postTodoHandler)
app.put('/api/todo/:id', apiHandlers.putTodoHandler)
app.delete('/api/todo/:id', apiHandlers.deleteTodoHandler)

app.get('/api/todos', apiHandlers.getTodosHandler)
app.put('/api/todos/reset', apiHandlers.resetTodosHandler)

app.post('/api/complete-todo/:id', apiHandlers.completeTodoHandler)

app.get('/todos', uiHandlers.todosPage)
app.get('/move-to-done', uiHandlers.moveToDoneAction)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/build/index.html'))
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
