const path = require('path')
const express = require('express')
const loggerMiddleware = require('./logger-middleware')
const apiHandlers = require('./api/handlers')
const uiHandlers = require('./ui/handlers')
const verifyAuthToken = require('./verify-auth-token')

const authRouter = require('./auth/auth-router')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(loggerMiddleware)
app.use(express.static(path.join(__dirname, '../../client/build')))

app.use('/api/auth', authRouter)

app.get('/api/todo/:id', apiHandlers.getTodoHandler)
app.post('/api/todo', apiHandlers.postTodoHandler)
app.put('/api/todo/:id', apiHandlers.putTodoHandler)
app.delete('/api/todo/:id', apiHandlers.deleteTodoHandler)

app.get('/api/todos', verifyAuthToken, apiHandlers.getTodosHandler)
app.put('/api/todos/reset', apiHandlers.resetTodosHandler)

app.post('/api/complete-todo/:id', apiHandlers.completeTodoHandler)

app.get('/todos', uiHandlers.todosPage)
app.get('/move-to-done', uiHandlers.moveToDoneAction)

function getPathToClient() {
  return path.join(__dirname, '../../client/build/index.html')
}

app.get('/auth/register', (req, res) => {
  res.sendFile(getPathToClient())
})

app.get('/auth/login', (req, res) => {
  res.sendFile(getPathToClient())
})

app.get('/home', (req, res) => {
  res.sendFile(getPathToClient())
})

app.get('/', (req, res) => {
  res.sendFile(getPathToClient())
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
