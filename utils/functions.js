

const formatData = (data) => {
  let newData = {}
  data.forEach(point => {
    if (point.village in newData) {
      newData[point.village] += point.amount
    } else {
      newData[point.village] = point.amount
    }
  })
  let result = []
  Object.keys(newData).forEach(key => {
    result.push({village_name: key, consumption: newData[key]})
  })
  return result
}

module.exports = formatData