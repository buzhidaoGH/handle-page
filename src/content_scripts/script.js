let href = window.location.href
console.log("Handle_Page保驾护航~")

getRules(rules => {
  let pattern
  let count = 0
  for (let rule of rules) {
    pattern = new RegExp('/' + rule.matchUrl + '/')
    if (pattern.test(href)) {
      count += handler(rule)
    }
  }
  if (count !== 0) console.log(`已经为您清除了${ count }条信息！`)
})

function handler(rule) {
  if (!rule.matchStatus) return 0
  let nodes = []
  switch (rule.matchType) {
    case 0:
      nodes = xpathUtil(rule.matchRule)
      break
    case 1:
      nodes = selectorUtil(rule.matchRule)
      break
    default:
      console.error("出现错误了哟~")
  }
  nodes.forEach(node => {
    node.remove()
  })
  return nodes.length
}