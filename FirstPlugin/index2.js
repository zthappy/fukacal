(function () {
     var firstAppend = true;
     var flightsList = []
     var flights = document.getElementById("flightListSearch");
     flights.addEventListener('click',function(){
          if(!flightsList || !flightsList.length){
               return;
          }
          getHtml(flightsList)
         
     },true)
     // 传参tid生成格式
     function getTid() {
          return "{xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx}".replace(/[xy]/g, function (t) {
               var e = 16 * Math.random() | 0;
               return ("x" == t ? e : 3 & e | 8).toString(16)
          })
     }
     $('#airplaneSubmitNew').click(() => {
          firstAppend = true;
          var formInfo = document.getElementById("iOrgPort").value;
          var toInfo = document.getElementById("iArvPort").value;
          var fromname = formInfo.split("(")[1].split(")")[0];
          var toname = toInfo.split("(")[1].split(")")[0];
          var fromDate = document.getElementById("idtGoDate").value;
          var toDate = document.getElementById("idtBackDate").value; // 返程日期
          
          var tid = getTid()
          var param = {"preprdid":"","trptpe":1,"flag":8,"searchitem":[{"dccode":fromname,"accode":toname,"dtime":fromDate}],"subchannel":null,"psgList":[{"type":1,"count":1}],"token":"1","seat":0,"segno":1,"tid":tid,"head":{"cid":"09031147311268805841","ctok":"","cver":"1.0","lang":"01","sid":"8888","syscode":"09","auth":null,"extension":[{"name":"aid","value":"2150"},{"name":"sid","value":"2536"},{"name":"protocal","value":"https"}]},"contentType":"json"}
          chrome.runtime.sendMessage({
               type:'test',
               param: param
          }, function(response) {
               var res = JSON.parse(JSON.stringify(response))
               flightsList = dealMessage(res) // 接口请求返回的参数
          });
     })

     function dealMessage(msg) {
          debugger
          var priceList = [];
          if(!msg.fltitem){
               return;
          }
          msg.fltitem.forEach(element => {
               var priceinfo = element.policyinfo[0].priceinfo[0];
               var price = priceinfo.price + priceinfo.tax;
               // 看是否是中转
               let isSplit = element.mutilstn.length > 1?true:false; 
               let isChange = (isSplit && element.mutilstn[0].basinfo.flgno == element.mutilstn[1].basinfo.flgno)?true:false;
              
               var plainNo = element.mutilstn[0].basinfo.flgno;

               priceList.push({
                    plainNo:plainNo,
                    price:price,
               })
          });
          return priceList;
     }

     function getHtml(arrDealMsg) {
          if(!firstAppend) {
               return;
          }
          
          var flightItems = $(".companyInfo");
          
          
          for(var i =0;i<flightItems.length;i++) {
               var showPrice = "暂无结果"
               var lyName = $(".companyInfo span")[i].innerHTML;
               // 如果有中转，再判断一下是不是同航班中转，如果不是，就不好判断
               var isSplit = $(".flighInfo .tipInfo")[i].innerHTML.indexOf('中转') > -1?true:false
               var isChange = $(".companyInfo")[i].innerHTML.indexOf('多家') > -1?true:false
               for(var j =0;j<arrDealMsg.length;j++){
                    if(lyName == arrDealMsg[j].plainNo || (lyName == arrDealMsg[j].plainNo && isSplit && !isChange)){
                         showPrice = arrDealMsg[j].price;
                         continue
                    }
               }
               $(".tipInfo")[i].append("携程价格："+showPrice);
          }
          firstAppend = false;
     }
    
    
 })();