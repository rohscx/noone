const {
    asyncRequest,
    objectKeyFilter
} = require('nodeutilz');

module.exports = function (networkId,apiKey,srcIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/events?productType=appliance&includedEventTypes[]=ip_conflict&includedEventTypes[]=dhcp_problem`,
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
        if (data.events.length === 0) return data;
        const dateToLocal = (data) => new Date(data).toLocaleString();
        const filteredDhcp = data.events.filter(({type}) => type==="dhcp_problem");
        const filteredIpConflict = data.events.filter(({type}) => type==="ip_conflict");
        const response = [...filteredDhcp,...filteredIpConflict]
            .map(({occurredAt,description,clientDescription,eventData}) => ({occurredAt:dateToLocal(occurredAt),description,clientDescription,eventData}));
        return response;
    };
    return asyncRequest(options).then(filterFunction).catch(console.log);
}