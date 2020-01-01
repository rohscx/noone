const nU = require('nodeutilz');

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
        const filtered = data.events.filter(({occurredAt}) => occurredAt).map(({occurredAt,eventData}) => {occurredAt,eventData.msg});
        const keyFilter = nU.objectKeyFilter(filtered.events,["occurredAt","eventData"])
        const response = filtered.length > 0 ? keyFilter : 'Nothing Found';
        
        return response;
    };
    return nU.asyncRequest(options).then(filterFunction);
}