const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

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
  res.send(todos)
})

app.post('/api/todo', (req, res) => {
  console.log('Request Body:', req.body)
  const id = uuidv4()
  res.json({ id: id })
})

app.get('/', (req, res) => {
  res.send('<body><h1>Move to Done</h1><p>Frontend application coming soon...</p></body>')
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
