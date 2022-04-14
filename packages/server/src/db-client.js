const { MongoClient } = require('mongodb')

let dbClient = null

function getDbClient() {
  if (dbClient === null) {
    console.log('Creating new db client...')
    const dbConnectionString = process.env.DB_CONNECTION_STRING

    if (dbConnectionString === undefined) {
      console.error('Make sure you set Environment Variables')
      return null
    }
    dbClient = new MongoClient(dbConnectionString)
  }

  return dbClient
}

module.exports = {
  getDbClient,
}
