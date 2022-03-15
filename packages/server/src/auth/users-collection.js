const { MongoClient } = require('mongodb')

const getDbClient = () => new MongoClient(process.env.DB_CONNECTION_STRING)

async function readUser(email) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('users')

    const document = await collection.findOne({ email })

    return {
      document,
    }
  } catch (err) {
    console.error(err)
    return {
      hasError: true,
    }
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function createUser(user) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('users')

    const result = await collection.insertOne(user)

    return result.acknowledged
  } catch (err) {
    console.error(err)
    return err
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

async function replaceUser(user) {
  const client = getDbClient()

  try {
    await client.connect()
    const database = client.db('todos-db')
    const collection = database.collection('users')

    const result = await collection.replaceOne({ id: user.id }, user)

    return result.matchedCount
  } catch (err) {
    console.error(err)
    return err
  } finally {
    await client.close()
    console.log('db connection closed')
  }
}

module.exports = {
  readUser,
  createUser,
  replaceUser,
}
