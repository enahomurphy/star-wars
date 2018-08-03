const express = require('express')

const peopleHandler = require('./server/handlers/get.people')
const planetHandler = require('./server/handlers/get.planets')

const app = express()

app.get('/', (req, res) => {
  res.send({
    message: 'welcome to the star wars api :-)'
  })
})
app.get('/people', peopleHandler)
app.get('/planets', planetHandler)

const port = process.env.PORT || 8081

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})

module.exports = server
