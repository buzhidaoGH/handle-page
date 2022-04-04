export function addRule(rule) {
  if (ruleIsExist(rule.matchId)) return
  chrome.storage.local.get(["rules"], ({ rules }) => {
    console.log(rules)
    rules.push(rule)
    console.log(rules)
    chrome.storage.local.set({ "rules": rules })
  })
}

export function ruleIsExist(ruleId) {
  chrome.storage.local.get(["rules"], ({ rules }) => {
    rules = JSON.parse(rules)
    for (let rule of rules) {
      if (ruleId === rule.matchId) return true
    }
    return false
  })
  return false
}

export function getRules(callback) {
  chrome.storage.local.get(["rules"], ({ rules }) => {
    callback(rules)
  })
}