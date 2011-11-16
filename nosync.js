process.nextTick(function () {
  Object.keys(process.binding("natives")).map(function (n) {
    if (n === "sys") return []
    var module = require(n)
    return Object.keys(module).filter(function (f) {
      return f.match(/Sync$/)
    }).map(function (f) {
      return [module, f, n]
    })
  }).reduce(function (l, r) {
    return l.concat(r)
  }, []).forEach(function (fn) {
    fn[0][fn[1]] = thrower(fn)
  })
})

function thrower (fn) { return function () {
  throw new Error("Sync function called after first tick: "+fn[2]+"."+fn[1])
}}
