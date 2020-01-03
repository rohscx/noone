const {
    asyncRequest,
} = require('nodeutilz');

module.exports = function (apiUrl,apiKey,bodyString) {

    const options = { method: 'POST',
        url: `${apiUrl}/api/v1/posts/ipv4FromString`,
        headers: 
        {
            'cache-control': 'no-cache',
            'auth-token': apiKey,
        'Content-Type': 'application/json' },
        body: {string:bodyString,options:{"onlyIp":true}},
        json:true  
    };

    return asyncRequest(options).catch(console.log);
}