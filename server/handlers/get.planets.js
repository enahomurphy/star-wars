const { getPlanets } = require('../services/swapi.service')

let cache = []

const handler = async (req, res) => {
  let data = []
  try {
    if (cache.length) {
      data = cache
    } else {
      data = await getPlanets()
      cache = data
    }

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
