const rp = require('request-promise-native')
require('dotenv').load()

const url = process.env.SWAPI_API_URL || 'https://swapi.co/api/'

/**
 * Swapi service makes calls to swapi api ftp ge
 * required data base of the type
 * eg type people gets all star wars character
 * since we already know the total pagination that
 * helps us make the call concurrently
 *
 * @param {*} type of data to return
 * @param {*} pageCount depth of pagination
 */
module.exports = async (type, pageCount) => {
  const promises = Array(pageCount)
    .fill(1).map((val, index) => {
      return rp(`${url}${type}/?page=${++index}&format=json`)
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
    throw (new Error({ message: `unable to fetch ${type} data from` }))
  }
}
