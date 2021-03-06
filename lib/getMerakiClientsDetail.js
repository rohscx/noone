const {
    asyncRequest,
} = require('nodeutilz');

module.exports = function (networkId,apiKey) {
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
        const dateToLocal = (data) => new Date(data).toLocaleString();
        const filtered = data
            .filter(({ip}) => ip);
        const response = filtered
            .map(({mac,description,ip,lastSeen,status,ssid}) => ({mac,description,ip,lastSeen:dateToLocal(lastSeen),status,ssid}));
        
        return response;
    };
    return asyncRequest(options).then(filterFunction).catch(console.error);
}