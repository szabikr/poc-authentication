const { MongoClient } = require('mongodb')

const getDbClient = () => {
  const dbConnectionString = process.env.DB_CONNECTION_STRING

  if (dbConnectionString === undefined) {
    console.error('Make sure you set Environment Variables')
    return null
  }
  return new MongoClient(dbConnectionString)
}

async function createRefreshToken(refreshToken) {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return { hasError: true }
  }

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('refresh-tokens')
    const result = await collection.insertOne(refreshToken)
    return result
  } catch (err) {
    console.log(err)
    return {
      hasError: true,
    }
  } finally {
    await client.close()
  }
}

module.exports = {
  createRefreshToken,
}
