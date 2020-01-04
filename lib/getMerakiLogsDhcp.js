const {
    asyncRequest,
    normalizedTime
} = require('nodeutilz');

module.exports = function (networkId,apiKey,srcIp) {
    var options = { method: 'GET',
        url: `https://api.meraki.com/api/v0/networks/${networkId}/events`,
        qsStringifyOptions: {arrayFormat: 'repeat'},
        qs: 
        { productType: 'appliance',
          'includedEventTypes[]': [ 'ip_conflict', 'dhcp_problem', 'dhcp_no_leases', 'rogue_dhcp' ],
          perPage: '25' },
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
        const filteredDhcp = data.events
            .filter(({type}) => type==="dhcp_problem");
        const filteredIpConflict = data.events
            .filter(({type}) => type==="ip_conflict");
        const response = [...filteredDhcp,...filteredIpConflict]
            .map(({occurredAt,description,clientDescription,eventData}) => ({occurredAt:normalizedTime(occurredAt,"EST"),description,clientDescription,eventData}));
        return response;
    };
    return asyncRequest(options).then(filterFunction).catch(console.error);
}