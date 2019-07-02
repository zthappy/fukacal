// https://flights.ctrip.com/international/search/api/search/batchSearch
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    if (request.type == 'test' && request.param) {
        var param = request.param;
        param = JSON.stringify(param)
        // $.ajax({
        //     url:"https://m.ctrip.com/restapi/soa2/13212/flightListSearch?_fxpcqlniredt=09031147311268805841",    //请求的url地址
        //     // dataType:"json",   //返回格式为json
        //     // contentType:"application/json;charset=UTF-8",
        //     //  async:true, //请求是否异步，默认为异步，这也是ajax重要特性
        //     data:param,    //参数值
        //     type:"POST",   //请求方式
        //     beforeSend:function(request){
        //         //请求前的处理
        //         request.setRequestHeader("Content-type","application/json; charset=utf-8");

        //     },
        //     success:function(req){
        //         //请求成功时处理
        //         console.log(req)
        //         sendResponse(JSON.stringify(req));
        //     },
        // //     complete:function(){
        // //         //请求完成的处理
        // //     },
        // //     error:function(){
        // //         //请求出错处理
        // //     }
        // });
        fetch('https://m.ctrip.com/restapi/soa2/13212/flightListSearch?_fxpcqlniredt=09031147311268805841',{
            method: 'POST',
            body: param,
            mode: 'cors',
        }).then(response => response.json())
        .then(text => sendResponse(text))
        .catch(error => {})
    }
    return true; // 没有这个会有报错
});
