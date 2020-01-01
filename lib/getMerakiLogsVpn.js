const nU = require('nodeutilz');

module.exports = function (networkId,apiKey,srcIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/events`,
        qs: { productType: 'appliance', 'includedEventTypes[]': 'vpn' },
        headers: { 
            'cache-control': 'no-cache',
            Connection: 'keep-alive',
            Referer: `https://api.meraki.com/api/v0/networks/${networkId}/events?productType=appliance&includedEventTypes[]=vpn`,
            'Cache-Control': 'no-cache',
            'X-Cisco-Meraki-API-Key': apiKey,
             Accept: '*/*' ,
            
        },
        json:true 
    };

    const filterFunction = (data) => {
        const filtered = data.events.filter(({occurredAt}) => occurredAt);
        const keyFilter = nU.objectKeyFilter(filtered,["occurredAt","eventData"])
        const response = filtered.length > 0 ? keyFilter : 'Nothing Found';
        
        return data;
    };
    return nU.asyncRequest(options).then(filterFunction);
}