const nU = require('nodeutilz');

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
        const filtered = data.filter(({ip}) => ip === deviceIp);
        const response = filtered.length > 0 ? filtered : 'Nothing Found';
        return response;
    };
    return nU.asyncRequest(options).then(filterFunction);
}