/**
 * xpathUtil工具
 */
function xpathUtil(xpath, context) {
  let nodes = []
  try {
    let doc = (context && context.ownerDocument) || window.document
    let results = doc.evaluate(xpath, context || doc, null, XPathResult.ANY_TYPE, null)
    let node
    while (node = results.iterateNext()) {
      nodes.push(node)
    }
  } catch (e) { console.error(e)}
  return nodes
}

/**
 * selectorUtil选择器工具
 */
function selectorUtil(selector) {
  let nodes = []
  try {
    for (const node of document.querySelectorAll(selector)) {
      nodes.push(node)
    }
  } catch (e) { console.error(e)}
  return nodes
}

/**
 * 添加rule
 */
function addRule(rule) {
  ruleNotExist(rule.matchId, () => {
    chrome.storage.local.get(["rules"], ({ rules }) => {
      rules.push(rule)
      chrome.storage.local.set({ "rules": rules })
    })
  })
}

/**
 * 删除rule(By ruleId)
 */
function deleteRule(ruleId) {
  ruleIsExist(ruleId, () => {
    chrome.storage.local.get(["rules"], ({ rules }) => {
      let filter = rules.filter(rule => rule.matchId !== ruleId)
      chrome.storage.local.set({ "rules": filter })
    })
  })
}

/**
 * 此规则ID不存在则执行
 */
function ruleNotExist(ruleId, callback) {
  chrome.storage.local.get(["rules"], function ({ rules }) {
    for (let rule of rules) {
      if (ruleId === rule.matchId) return
    }
    callback()
  })
}

/**
 * 此规则ID存在则执行
 */
function ruleIsExist(ruleId, callback) {
  chrome.storage.local.get(["rules"], function ({ rules }) {
    for (let rule of rules) {
      if (ruleId === rule.matchId) callback()
    }
  })
}

/**
 * 获取所有rules的回调
 */
function getRules(callback) {
  chrome.storage.local.get(["rules"], ({ rules }) => {
    callback(rules)
  })
}

/**
 * 随机生成uuid
 */
function guid() {
  return 'self-xxxx-xxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0,
        v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}