const { getPlanets } = require('../services/swapi.service')

const handler = async (req, res) => {
  try {
    let data = await getPlanets()

    res.send(data)
  } catch (e) {
    res.status(500).send({
      details: e.message
    })
  }
}

module.exports = [
  handler
]
