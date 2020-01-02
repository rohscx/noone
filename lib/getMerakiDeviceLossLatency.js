const {
    asyncRequest,
    stdev,
} = require('nodeutilz');

module.exports = function (networkId,apiKey,deviceSn,dstIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/devices/${deviceSn}/lossAndLatencyHistory`,
        qs: { ip: dstIp },
        headers: { 
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
            'X-Cisco-Meraki-API-Key': apiKey,
             Accept: '*/*' ,
        },
        json:true 
    };

    const networkStatusFunction = (data) => {
        const addThem = (a,b) => {
            return a+b;
        };
        const lossArray = data.map(({lossPercent}) => lossPercent);
        const latencyArray = data.map(({latencyMs}) => latencyMs);
        const lossAverage = new Number(lossArray.reduce(addThem) / lossArray.length).toFixed(1);
        const latencyAverage = new Number(latencyArray.reduce(addThem) / latencyArray.length).toFixed(1);
        const lossStd = stdev(lossArray);
        const latencyStd =  stdev(latencyArray);
        const lossHealthStatus = lossAverage < (lossStd * 2) ? "Healthy" : "Unhealty";
        const latencyHeathStatus = latencyAverage < (latencyStd * 2) ? "Healthy" : "Unhealty";
        const metaData = {lossAverage,lossAverageUnit:"percent",latencyAverage,latencyAverageUnit:"ms",lossStd,latencyStd,dstIp};
        const response = {lossHealthStatus,latencyHeathStatus,metaData};
        
        return response;
    };
    return asyncRequest(options).then(networkStatusFunction);
}