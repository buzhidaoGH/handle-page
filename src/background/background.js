chrome.storage.local.clear(() => {
  console.log('清空storage!')
})

let url = chrome.runtime.getURL("/background/rules.json")
fetch(url).then(response => {
  response.json().then(rules => {
    chrome.storage.local.set({ "rules": rules }, () => {
      console.log("基本rules初始化成功!")
    })
  })
})