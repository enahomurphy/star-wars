const rp = require('request-promise-native')
require('dotenv').load()

const url = process.env.SWAPI_API_URL

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
    throw (new Error({ message: `Unable to fetch people data from` }))
  }
}
