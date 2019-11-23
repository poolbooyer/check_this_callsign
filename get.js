function getCall(event){// XMLHttpRequestオブジェクトの作成
  let request = new XMLHttpRequest()
  const call=document.forms.query.callsign.value
  // URLを開く
  request.open('GET', `https://www.tele.soumu.go.jp/musen/list?ST=1&DA=0&DC=1&SC=1&OF=2&OW=AT&MA=${call}`, true)
  request.responseType = 'json'
  // レスポンスが返ってきた時の処理を記述 
  request.onload = function () {
    data=this.response

    let output =`<p>入力:<span id='inputValue'>${call}</span></p>`
    // レスポンスが返ってきた時の処理
    if(data['musen'].length>3){
      for (let i = 0, l = 3; i < l; i++) {
        output = output + `<div class='result'><h2>結果 ${i + 1}</h2>`
        output = output + `<dl class='data'>
          <div class=row><dt>名称</dt><dd>${data['musen'][i]['listInfo']['name']}</dd></div>
          <div class=row><dt>所在地</dt><dd>${data['musen'][i]['listInfo']['tdfkCd']}</dd></div>
          </dl></div>`
      }
      output=output+`<button id='viewMore' class='btn_sub'>他の結果はこちら</button>`
    }else {
      for (let i=0,l = data['musen'].length; i < l;i++){
        output = output +`<div class='result'><h2>結果 ${i+1}</h2>`
        output = output + `<dl class='data'>
          <div class=row><dt>名称</dt><dd>${data['musen'][i]['listInfo']['name']}</dd></div>
          <div class=row><dt>所在地</dt><dd>${data['musen'][i]['listInfo']['tdfkCd']}</dd></div>
          </dl></div>`
      }
    }
    document.getElementById('result').innerHTML = output
    document.getElementById('viewMore').addEventListener('click', openView)
  }
  // リクエストをURLに送信
  request.send()
}
function openView(event){
  const call = document.getElementById('inputValue').textContent
  const target = `https://www.tele.soumu.go.jp/musen/SearchServlet?SC=1&pageID=3&SelectID=1&CONFIRM=0&SelectOW=01&IT=&HC=&HV=&FF=&TF=&HZ=3&NA=&MA=${call}&DFY=&DFM=&DFD=&DTY=&DTM=&DTD=&SK=2&DC=100#result`
  chrome.tabs.create(
    { url :  target }
  )
}
document.getElementById('check').addEventListener('click',getCall)
