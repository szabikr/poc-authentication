const express = require('express')
const loggerMiddleware = require('./logger-middleware')
const {
  getTodoHandler,
  getTodosHandler,
  postTodoHandler,
  putTodoHandler,
  deleteTodoHandler,
} = require('./handlers')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(loggerMiddleware)

app.get('/api/todo/:id', getTodoHandler)
app.get('/api/todos', getTodosHandler)
app.post('/api/todo', postTodoHandler)
app.put('/api/todo/:id', putTodoHandler)
app.delete('/api/todo/:id', deleteTodoHandler)

app.get('/', (req, res) => {
  res.send('<body><h1>Move to Done</h1><p>Frontend application coming soon...</p></body>')
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
