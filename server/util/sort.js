module.exports = (entries, sortBy) => {
  return entries.sort((prev, next) => {
    let prevSort
    let nextSort
    switch (sortBy) {
      case 'name':
        prevSort = prev[sortBy].toUpperCase()
        nextSort = next[sortBy].toUpperCase()
        break
      case 'height':
      case 'mass':
        // sort numbers from highest to smallest
        prevSort = toInt(next[sortBy])
        nextSort = toInt(prev[sortBy])
        break
    }
    if (prevSort < nextSort) return -1

    if (prevSort > nextSort) return 1

    return 0
  })
}

const toInt = (str = '') => {
  const t = str.replace(',', '')

  return isNaN(t) ? 0 : parseFloat(t)
}
