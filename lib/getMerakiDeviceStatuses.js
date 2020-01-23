const {
    asyncRequest,
    normalizedTime
} = require('nodeutilz');

module.exports = function (networkId,apiKey,organizationId) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/organizations/${organizationId}/events`,
        headers: { 
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
            'X-Cisco-Meraki-API-Key': apiKey,
             Accept: '*/*' ,
            
        },
        json:true 
    };

    const filterFunction = (data,id) => {
        return data.filter(({networkId}) => networkId === id );
    };
    return asyncRequest(options).then(filterFunction,networkId).catch(console.error);
}