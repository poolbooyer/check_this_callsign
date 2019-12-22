function getCall(event){
  let request = new XMLHttpRequest()
  const call=document.forms.query.callsign.value
  const checkCallSign = validateCallsign(call)
  if (checkCallSign) {
    request.open('GET', `https://www.tele.soumu.go.jp/musen/list?ST=1&DA=0&DC=1&SC=1&OF=2&OW=AT&MA=${call}`, true)
    request.responseType = 'json'
    request.onload = function () {
      data=this.response

      let output =`<p>入力:<span id='inputValue'>${call}</span></p>`
      if(data['musen'].length>3){
        for (let i = 0, l = 3; i < l; i++) {
          output = output + `<div class='result'><h2>結果 ${i + 1}</h2>`
          output = output + `<dl class='data'>
            <div class=row><dt>名称</dt><dd>${data['musen'][i]['listInfo']['name']}</dd></div>
            <div class=row><dt>所在地</dt><dd>${data['musen'][i]['listInfo']['tdfkCd']}</dd></div>
            </dl></div>`
        }
        output=output+`<button id='viewMore' class='btn_sub'>他の結果はこちら</button>`
        document.getElementById('result').innerHTML = output
        document.getElementById('viewMore').addEventListener('click', openView)
      }else {
        for (let i=0,l = data['musen'].length; i < l;i++){
          output = output +`<div class='result'><h2>結果 ${i+1}</h2>`
          output = output + `<dl class='data'>
            <div class=row><dt>名称</dt><dd>${data['musen'][i]['listInfo']['name']}</dd></div>
            <div class=row><dt>所在地</dt><dd>${data['musen'][i]['listInfo']['tdfkCd']}</dd></div>
            </dl></div>`
        }
        document.getElementById('result').innerHTML = output
      }
    }
    request.send()
  }else{
    document.getElementById('result').innerHTML =''
    let output = 'コールサインとして認識できませんでした。'
    document.getElementById('result').innerHTML = output
  }
}

function validateCallsign(input){
  const callPattern1 = /[J]{1}[^B-DT-Z]{1}\d{1}[A-Z]{2,3}$/i
  const callPattern2 = /7[KN]{1}\d{1}[A-Z]{2,3}/i
  const callPattern3 = /8[JN]\d{1}[A-Z0-9]{1,}/i
  if (input.match(callPattern1) !== null){
    return true
  }else if(input.match(callPattern2) !== null){
    return true
  }else if(input.match(callPattern3) !== null){
    return true
  }else{
    return false
  }
}

function openView(event){
  const call = document.getElementById('inputValue').textContent
  const target = `https://www.tele.soumu.go.jp/musen/SearchServlet?SC=1&pageID=3&SelectID=1&CONFIRM=0&SelectOW=01&IT=&HC=&HV=&FF=&TF=&HZ=3&NA=&MA=${call}&DFY=&DFM=&DFD=&DTY=&DTM=&DTD=&SK=2&DC=100#result`
  chrome.tabs.create(
    { url :  target }
  )
}

document.getElementById('check').addEventListener('click',getCall)
