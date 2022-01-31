const express = require('express')
const loggerMiddleware = require('./logger-middleware')
const apiHandlers = require('./api-handlers')
const uiHandlers = require('./ui/handlers')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(loggerMiddleware)

app.get('/api/todo/:id', apiHandlers.getTodoHandler)
app.post('/api/todo', apiHandlers.postTodoHandler)
app.put('/api/todo/:id', apiHandlers.putTodoHandler)
app.delete('/api/todo/:id', apiHandlers.deleteTodoHandler)

app.get('/api/todos', apiHandlers.getTodosHandler)
app.put('/api/todos/reset', apiHandlers.resetTodosHandler)

app.get('/todos', uiHandlers.todosPage)
app.get('/move-to-done', uiHandlers.moveToDoneAction)

app.get('/', (req, res) => {
  res.send('<body><h1>Move to Done</h1><p>Frontend application coming soon...</p></body>')
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
