const { MongoClient } = require('mongodb')

const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const cluster = process.env.DB_CLUSTER

const uri = `mongodb+srv://${username}:${password}@${cluster}?retryWrites=true&w=majority`

const myClient = new MongoClient(uri)

async function useTodosCollection(client, operation) {
  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('todos')

    return await operation(collection)
  } catch (err) {
    console.error(err)
  }
  finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function getTodos(collection) {
  const todos = await collection.find().toArray()
  return todos
}

useTodosCollection(myClient, getTodos)
  .then(todos => {
    console.log('todos are')
    console.log(todos)
  })
  .catch(console.dir)
