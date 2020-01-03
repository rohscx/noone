const {
    asyncRequest,
    objectKeyFilter,
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
        const filtered = data.filter(({ip}) => ip);
        const keyFilter = objectKeyFilter(filtered,["description","ip"])
        const response = filtered.length > 0 ? keyFilter : 'Nothing Found';
        
        return response;
    };
    return asyncRequest(options).then(filterFunction).catch(console.log);
}