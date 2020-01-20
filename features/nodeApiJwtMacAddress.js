const getApiMacAddressInString = require('../lib/getApiMacAddressInString.js');
const contextualReply = require('../lib/contextualReply.js');

// Custom bot libs


const apiUrl = process.env.NODEAPPJWT_API_URL;
const apiJwtToken = process.env.NODEAPPJWT_API_AUTH_TOKEN;


module.exports = function(controller) {

  controller.hears(
    ['extract mac address','extract the mac address', 'extract the mac address'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      // Validate that a MAC address is present
      if (message.text.search(new RegExp(/(([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})|([0-9A-Fa-f]{4}[.:-]){2})/)) !==-1) {
        const data = await getApiMacAddressInString(apiUrl,apiJwtToken,message.text);
        const asString = JSON.stringify(data,null,'\t');
        contextualReply(bot,message,asString);   
      } else {
        contextualReply(bot,message,asString);     
      }
    });

}
