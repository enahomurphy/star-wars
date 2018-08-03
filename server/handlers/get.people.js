const swapi = require('../services/swapi.service')

const handler = async (res, req) => {
  const data = await swapi('people', 9)

  req.send(data)
}

module.exports = [
  handler
]
