const { MongoClient } = require('mongodb')

const getDbClient = () => new MongoClient(process.env.DB_CONNECTION_STRING)

async function readTodo(id) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('todos')

    const todo = await collection.findOne({ id })

    return todo
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function readTodos() {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('todos')

    const todos = await collection.find().toArray()

    return todos.map((todo) => ({
      id: todo.id,
      content: todo.content,
      completed: todo.completed,
    }))
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function createTodo(todo) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('todos')

    const result = await collection.insertOne(todo)

    return result.acknowledged
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function updateTodo(id, completed) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('todos')

    const filter = { id }
    const updateDoc = { $set: { completed } }
    const result = await collection.updateOne(filter, updateDoc)

    return result.modifiedCount > 0
  } catch (err) {
    console.error(err)
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function deleteTodo(id) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('todos')

    const result = await collection.deleteOne({ id })

    return result.deletedCount > 0
  } catch (err) {
    console.log(err)
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function resetAllTodos() {
  const client = getDbClient()

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('todos')

    const filter = {}
    const updateDoc = { $set: { completed: false } }
    const result = await collection.updateMany(filter, updateDoc)

    return result.matchedCount > 0
  } catch (err) {
    console.error(err)
  } finally {
    client.close()
    console.log('db connection closed')
  }
}

module.exports = {
  readTodo,
  readTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  resetAllTodos,
}
