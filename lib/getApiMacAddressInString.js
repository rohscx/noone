const {
    asyncRequest,    
} = require('nodeutilz');

module.exports = function (apiUrl,apiKey,bodyString) {

    const optionsMaker = (data) => {
        const options = {};
        if (data.toLowerCase().search("cisco") !== -1){
            options.format =[".",4];
            if (data.toLowerCase().search("upper") !== -1){
                options.case= "upper";
            } else {
                options.case= "lower";
            }
            return options;
        } else {
            options.format =[":",2];
            options.case= "lower";
            return options;
        }
    };
    const options = { method: 'POST',
        url: `${apiUrl}/api/v1/posts/macAddressFromString`,
        headers: 
        {
            'cache-control': 'no-cache',
            'auth-token': apiKey,
        'Content-Type': 'application/json' },
        body: {string:bodyString,options:optionsMaker(bodyString)},
        json:true  
    };

    return asyncRequest(options).catch(console.error);
}