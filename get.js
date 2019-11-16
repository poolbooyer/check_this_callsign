function getCall(event){// XMLHttpRequestオブジェクトの作成
  var request = new XMLHttpRequest()
  let call=document.forms.query.callsign.value
  // URLを開く
  request.open('GET', `https://www.tele.soumu.go.jp/musen/list?ST=1&DA=0&DC=1&SC=1&OF=2&OW=AT&MA=${call}`, true)
  request.responseType = 'json'
  // レスポンスが返ってきた時の処理を記述 
  request.onload = function () {
    data=this.response
    console.log(data)
    let output=''
    // レスポンスが返ってきた時の処理
    if(data['musen'].length>5){
      for (let i = 0, l = 5; i < l; i++) {
        output = output + `<h2>結果 ${i + 1}</h2>`
        output = output + `<dl>
          <dt>名称</dt><dd>${data['musen'][i]['listInfo']['name']}</dd>
          <dt>所在地</dt><dd>${data['musen'][i]['listInfo']['tdfkCd']}</dd>
          </dl>`
      }
      output=output+`<a href="https://www.tele.soumu.go.jp/musen/SearchServlet?SC=1&pageID=3&SelectID=1&CONFIRM=0&SelectOW=01&IT=&HC=&HV=&FF=&TF=&HZ=3&NA=&MA=${call}&DFY=&DFM=&DFD=&DTY=&DTM=&DTD=&SK=2&DC=100#result">他の結果はこちら</a>`
    }else {
      for (let i=0,l = data['musen'].length; i < l;i++){
        output=output+`<h2>結果 ${i+1}</h2>`
        output = output + `<dl>
          <dt>名称</dt><dd>${data['musen'][i]['listInfo']['name']}</dd>
          <dt>所在地</dt><dd>${data['musen'][i]['listInfo']['tdfkCd']}</dd>
          </dl>`
      }
    }
    document.getElementById('result').innerHTML = output
  }

  // リクエストをURLに送信
  request.send()
}

document.getElementById('check').addEventListener('click',getCall)
