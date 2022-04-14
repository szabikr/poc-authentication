const { getDbClient } = require('../db-client')

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

async function readRefreshToken(refreshTokenValue) {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return { hasError: true }
  }

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('refresh-tokens')
    const document = await collection.findOne({ value: refreshTokenValue })
    return { document }
  } catch (err) {
    console.error(err)
    return { hasError: true }
  } finally {
    await client.close()
  }
}

async function setRefreshTokenReplacedBy(
  refreshTokenValue,
  newRefreshTokenValue,
) {
  const client = getDbClient()

  if (!client) {
    console.error('MongoDB Client is not defined')
    return { hasError: true }
  }

  try {
    await client.connect()
    const collection = client.db('todos-db').collection('refresh-tokens')
    const result = await collection.updateOne(
      { value: refreshTokenValue },
      { $set: { replacedBy: newRefreshTokenValue } },
    )
    return result.acknowledged
  } catch (err) {
    console.error(err)
    return { hasError: true }
  } finally {
    await client.close()
  }
}

module.exports = {
  createRefreshToken,
  readRefreshToken,
  setRefreshTokenReplacedBy,
}
