import Vue from 'vue'

Vue.filter('commaNumber', function(x) {
  return x
    .toString()
    .replace(/(\d)(?=(?:\d{3})+(?:\.|$))|(\.\d*)$/g, function(m, s1, s2) {
      return s2 || s1 + ','
    })
})

Vue.filter('nknValue', function(x) {
  return Number(parseFloat(x) / 100000000)
})

Vue.filter('avg', function(arr) {
  return (arr.reduce((p, c) => Number(p) + Number(c), 0) / arr.length).toFixed(
    0
  )
})

Vue.filter('hexConverter', function(hex) {
  hex = hex.toString()
  let str = ''
  for (let i = 0; i < hex.length && hex.substr(i, 2) !== '00'; i += 2) {
    str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
  }
  return str
})
