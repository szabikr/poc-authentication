const express = require('express')
const { v4: uuidv4 } = require('uuid')
const loggerMiddleware = require('./logger-middleware')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(loggerMiddleware)

let todos = [
  {
    id: '674b1934-dbaa-4679-88ce-513439e581be',
    content: 'that',
  },
  {
    id: '9c985402-2bcc-4f86-a7ac-fee7e40d3bfc',
    content: 'this',
  }, 
  {
    id: '5557295e-3e5f-4b7e-aec2-76b4815e1f59',
    content: 'and that one'
  }
]

app.get('/api/todos', (req, res) => {
  return res.send(todos)
})

app.post('/api/todo', (req, res) => {
  if (!req.body || !req.body.content || req.body.content === '') {
    return res.status(400).end('Invalid Request Body')
  }

  const id = uuidv4()
  todos.push({
    id,
    content: req.body.content,
  })
  return res.json({ id: id })
})

app.put('/api/todo/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).end('Invalid Request')
  }

  let todo = todos.find(todo => todo.id === req.params.id)

  if (todo === undefined) {
    return res.status(404).end(`Todo with id: ${req.params.id} does not exist`)
  }

  if (todo.completed) {
    todo.completed = false
  } else {
    todo.completed = true
  }
  
  return res.json(todo);
})

app.delete('/api/todo/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).end('Invalid Request')
  }

  const index = todos.findIndex(todo => todo.id === req.params.id)

  if (index > -1) {
    todos.splice(index, 1)
  }

  return res.status(200).end();
})

app.get('/', (req, res) => {
  res.send('<body><h1>Move to Done</h1><p>Frontend application coming soon...</p></body>')
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
