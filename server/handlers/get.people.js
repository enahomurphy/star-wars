const { getPeople } = require('../services/swapi.service')
const Sort = require('../util/sort')

let cache = []

const handler = async (req, res) => {
  const { sortBy } = req.query
  const sortValues = new Set(['name', 'height', 'mass'])
  let data = []
  try {
    if (cache.length) {
      data = cache
    } else {
      data = await getPeople()
      cache = data
    }

    if (sortBy && sortValues.has(sortBy.toLowerCase())) {
      data = Sort(data, sortBy)
    }

    res.json(data)
  } catch (e) {
    res.status(500).json({
      details: e.message
    })
  }
}

module.exports = [
  handler
]
