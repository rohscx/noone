const {
    asyncRequest,
    objectKeyFilter
} = require('nodeutilz');

module.exports = function (networkId,apiKey,srcIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/events`,
        qs: { productType: 'appliance',
        'includedEventTypes[]': [ 'ip_conflict', 'dhcp_problem' ] },
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
        // const filteredDhcp = data.events.filter(({type}) => type==="dhcp_problem");
        // const filteredIpConflict = data.events.filter(({type}) => type==="ip_conflict");
        // const response = [...filteredDhcp,...filteredIpConflict];
        return data;
    };
    return asyncRequest(options).then(filterFunction);
}