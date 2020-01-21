const getApiNetworkScope = require('../lib/getApiNetworkScope.js');
const contextualReply = require('../lib/contextualReply.js');

// Custom bot libs


const apiUrl = process.env.NODEAPPJWT_API_URL;
const apiJwtToken = process.env.NODEAPPJWT_API_AUTH_TOKEN;


module.exports = function(controller) {

  controller.hears(
    ['extract cidr network', 'extract cidr'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      // Validate that a MAC address is present
      const isCidr = message.text.match(new RegExp(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).*\/[0-9]{0,1}[0-9]\b/));
      if (isCidr) {
        const cleanedCidr = isCidr[0].replace(new RegExp(/\s/,'g'),'');
        const data = await getApiNetworkScope(apiUrl,apiJwtToken,cleanedCidr);
        const asString = JSON.stringify(data,null,'\t');
        await contextualReply(bot,message,asString); 
      } else {
        await contextualReply(bot,message,asString);    
      }
    });

}
