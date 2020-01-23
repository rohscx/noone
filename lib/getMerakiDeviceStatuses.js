const {
    asyncRequest,
    normalizedTime
} = require('nodeutilz');

module.exports = function (networkId,apiKey,organizationId) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/organizations/${organizationId}/deviceStatuses`,
        headers: { 
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Cache-Control': 'no-cache',
            'X-Cisco-Meraki-API-Key': apiKey,
             Accept: '*/*' ,
            
        },
        json:true 
    };
    const functionGenerator = (netId) => {
        return function (data) {
            const id = netId;
            return data.filter(({networkId}) => networkId === id );
        }
    }
    const filterFunction = functionGenerator(networkId);
    return asyncRequest(options).then(filterFunction).catch(console.error);
}