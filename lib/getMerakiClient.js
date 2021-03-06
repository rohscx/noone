const {
    asyncRequest,
    normalizedTime
} = require('nodeutilz');

module.exports = function (networkId,apiKey,deviceIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/clients`,
        qs: { perPage: '1000' },
        headers: { 
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
            'X-Cisco-Meraki-API-Key': apiKey,
             Accept: '*/*' ,
            
        },
        json:true 
    };
    const filterFunction = (data) => {
        if (data.length === 0) return data;
        const filtered = data
            .filter(({ip}) => ip === deviceIp);
        const response = filtered
            .map(({mac,description,ip,lastSeen,status}) => ({mac,description,ip,lastSeen:normalizedTime(lastSeen,"EST"),status}));
        return response;
    };
    return asyncRequest(options).then(filterFunction).catch(console.error);
}