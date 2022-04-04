let $tableRulesBody = $('#tableRules > tbody')

function templeInit(rule) {
  return `<tr> <td>${ rule.matchName }</td>
  <td>
    <input type="text" style="width: 100px" value="${ rule.matchUrl }" disabled />
  </td>
  <td>
    <input type="text" style="width: 140px" value="${ rule.matchRule }" disabled />
  </td>
  <td>${ rule.matchType === 1 ? 'Selector' : 'Xpath' }</td>
  <td>
    <input class="switch" type="checkbox" matchid="${ rule.matchId }" ${ rule.matchStatus ? 'checked' : '' }>
  </td>
  <td>
    <input class="button" type="button" matchid="${ rule.matchId }" value="删除" />
  </td>
</tr>`
}

function renderTableBody(rules) {
  $tableRulesBody.empty()
  if (rules.length === 0) {
    $tableRulesBody.append('<p>无数据</p>')
    return
  }
  for (let rule of rules) {
    $tableRulesBody.append(templeInit(rule))
  }
}

$(() => {
  // 获取所有规则,并渲染至表body中
  getRules(rules => {
    renderTableBody(rules)
  })

  // 删除规则
  $tableRulesBody.on('click', '.button[matchid]', function () {
    if (confirm('您确定删除此规则吗?')) {
      deleteRule($(this).attr('matchid'))
      this.parentElement.parentElement.remove()
    }
  })

  // 开启或关闭规则
  $tableRulesBody.on('change', 'input[type="checkbox"].switch', function () {
    ruleIsExist($(this).attr('matchid'), () => {
      chrome.storage.local.get(["rules"], ({ rules }) => {
        let map = rules.map(rule => {
          if (rule.matchId === $(this).attr('matchid')) {
            rule.matchStatus = $(this).prop('checked')
          }
          return rule
        })
        chrome.storage.local.set({ "rules": map })
      })
    })
  })

  // 添加规则
  $('#addSelfRule').on('click', () => {
    addRule({
      "matchId": guid(),
      "matchName": $('#selfName').val() || 'null',
      "matchUrl": $('#selfUrl').val() || 'null',
      "matchType": parseInt($('#selfType').val()),
      "matchStatus": false,
      "matchRule": $('#selfRule').val() || 'null'
    })
    window.location.reload()
  })
})

/*setting.addEventListener('click', () => {
addRule({
      "matchId": guid(),
      "matchName": "百度广告4",
      "matchUrl": "*://www.baidu.com/!*",
      "matchType": 1,
      "matchRule": "#div"
    })
})*/