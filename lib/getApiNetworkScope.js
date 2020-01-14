const {
    asyncRequest,
} = require('nodeutilz');

module.exports = function (apiUrl,apiKey,bodyString) {

    const options = { method: 'POST',
        url: `${apiUrl}/api/v1/posts/networkScope`,
        headers: 
        {
            'cache-control': 'no-cache',
            'auth-token': apiKey,
        'Content-Type': 'application/json' },
        body: {"ipV4cidr":bodyString},
        json:true  
    };

    return asyncRequest(options).catch(console.error);
}