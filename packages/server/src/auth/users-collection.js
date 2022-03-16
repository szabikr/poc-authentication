const { MongoClient } = require('mongodb')

const getDbClient = () => {
  const dbConnectionString = process.env.DB_CONNECTION_STRING

  if (dbConnectionString === undefined) {
    console.error('Make sure you set Environment Variables')
    return null
  }
  return new MongoClient(dbConnectionString)
}

async function readUser(email) {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return { hasError: true }
  }

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('users')
    const document = await collection.findOne({ email })
    return { document }
  } catch (err) {
    console.error(err)
    return { hasError: true }
  } finally {
    await client.close()
  }
}

async function readUserById(id) {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return { hasError: true }
  }

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('users')
    const document = await collection.findOne({ id })
    return { document }
  } catch (err) {
    console.error(err)
    return { hasError: true }
  } finally {
    await client.close()
  }
}

async function createUser(user) {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return { hasError: true }
  }

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('users')

    const result = await collection.insertOne(user)

    return result.acknowledged
  } catch (err) {
    console.error(err)
    return err
  } finally {
    await client.close()
  }
}

module.exports = {
  readUser,
  readUserById,
  createUser,
}
