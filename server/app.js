const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello from Move to Done app!')
})

app.listen(port, () => {
  console.log(`Move to Done app listening on port ${port}`)
})
