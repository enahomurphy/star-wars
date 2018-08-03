const { getPeople } = require('../services/swapi.service')
const Sort = require('../util/sort')

const handler = async (req, res) => {
  const { sort } = req.query
  const sortValues = new Set(['name', 'height', 'mass'])

  try {
    let data = await getPeople()

    if (sort && sortValues.has(sort)) {
      data = Sort(data, sort)
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
