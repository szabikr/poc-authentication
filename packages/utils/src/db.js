const { MongoClient } = require('mongodb')

const getDbClient = () => {
  if (process.env.DB_CONNECTION_STRING === undefined) {
    console.error('Make sure you set environment variables')
    return null
  }
  new MongoClient(process.env.DB_CONNECTION_STRING)
}

async function deleteE2eUsers() {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return
  }

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('users')

    const result = await collection.deleteMany({ email: /^e2e-test/ })

    return result.deletedCount
  } catch (err) {
    console.error(err)
    return null
  } finally {
    await client.close()
  }
}

async function countUsers() {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return
  }

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('users')

    const result = await collection.find().count()

    return result
  } catch (err) {
    console.error(err)
    return null
  } finally {
    await client.close()
  }
}

module.exports = {
  deleteE2eUsers,
  countUsers,
}
