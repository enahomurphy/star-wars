const rp = require('request-promise-native')

const url = 'https://swapi.co/api/'

/**
 * Swapi service makes calls to swapi and gets all
 * star was characters
 * since we already know the total pagination that
 * helps us make the call concurrently
 *
 * @returns {Promise}
 */
module.exports.getPeople = async () => {
  const promises = Array(9)
    .fill(1).map((val, index) => {
      return rp(`${url}people/?page=${++index}&format=json`)
    })

  try {
    const response = await Promise.all(promises)

    const data = response.reduce((acc, data) => {
      const parsedResponse = JSON.parse(data)
      Array.prototype.push.apply(acc, parsedResponse.results)

      return acc
    }, [])

    return data
  } catch (e) {
    throw (new Error({ message: `Unable to fetch people data from swapi` }))
  }
}

/**
 * GetPlanets returns all planets visit
 * oin star wars
 * helps us make the call concurrently
 *
 * @returns {Promise}
 */
module.exports.getPlanets = async () => {
  const promises = Array(7)
    .fill(1).map((val, index) => {
      return rp(`${url}planets/?page=${++index}&format=json`)
    })

  try {
    const response = await Promise.all(promises)

    // get all planets
    let data = response.reduce((acc, data) => {
      const { results } = JSON.parse(data)
      Array.prototype.push.apply(acc, results)

      return acc
    }, [])

    // get all residents for the plant
    data = data.map(async (result) => {
      const promises = result.residents.map((resident) => rp(resident))
      const residents = await Promise.all(promises)

      const residentNames = residents.map((resident) => {
        const { name } = JSON.parse(resident)
        return name
      })

      return Object.assign(
        {},
        result,
        { residents: residentNames }
      )
    })

    return await Promise.all(data)
  } catch (e) {
    throw (new Error({ message: `Unable to fetch planet data from swapi` }))
  }
}
