const nU = require('nodeutilz');

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
    return nU.asyncRequest(options);
}