const {
    asyncRequest,
    objectKeyFilter
} = require('nodeutilz');

module.exports = function (networkId,apiKey,srcIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/events`,
        qs: { productType: 'appliance', 'includedEventTypes[]': 'vpn' },
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
        const filtered = data.events.filter(({occurredAt}) => occurredAt).map(({occurredAt,eventData}) => ({occurredAt,msg:eventData.msg}));
        const response = filtered.length > 0 ? filtered : 'Nothing Found';
        return response;
    };
    return asyncRequest(options).then(filterFunction);
}