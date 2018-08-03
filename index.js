const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send({
    message: 'welcome to the stars, war simulation is about to begin'
  })
})

const port = process.env.PORT || 8081

const server = app.listen(port, () => {
  console.log(`app is running on port ${port}`)
})

module.exports = server
