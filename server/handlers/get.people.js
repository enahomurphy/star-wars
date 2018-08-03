const { getPeople } = require('../services/swapi.service')
const Sort = require('../util/sort')

const handler = async (req, res) => {
  const { sort } = req.query
  const sortValues = new Set(['name', 'height', 'mass'])

  let data = await getPeople()

  if (sort && sortValues.has(sort)) {
    data = Sort(data, sort)
  }

  res.send(data)
}

module.exports = [
  handler
]
