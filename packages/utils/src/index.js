const readline = require('readline')
const { deleteE2eUsers, countUsers } = require('./db')

console.log('Move to Done Utility Library')
console.log('----------------------------')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'MTD_Utils > ',
})

rl.prompt()

rl.on('line', async (line) => {
  switch (line.trim()) {
    case 'help':
      console.log('delete e2e test users')
      console.log('count users')
      break

    case 'delete e2e test users':
      const result = await deleteE2eUsers()
      if (result <= 0) {
        console.log('No records to delete')
      } else {
        console.log(`Deleted ${result} e2e test users`)
      }
      break

    case 'count users':
      const count = await countUsers()
      if (count) {
        console.log(`There are ${count} users`)
      } else {
        console.log('Something went wrong')
      }
      break

    default: {
      console.log(`Say what? My memory is vague about '${line.trim()}'`)
      break
    }
  }
  rl.prompt()
}).on('close', () => {
  console.log('Farewell MTD Engineer!')
  process.exit(0)
})
