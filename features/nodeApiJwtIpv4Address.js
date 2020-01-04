// Custom bot libs
const getApiIpv4AddressInString = require('../lib/getApiIpv4AddressInString.js');
const isDirectMessage = require('../lib/isDirectMessage.js');

const apiUrl = process.env.NODEAPPJWT_API_URL;
const apiJwtToken = process.env.NODEAPPJWT_API_AUTH_TOKEN;


module.exports = function(controller) {

  controller.hears(
    ['extract ip address', 'extract all ip address', 'extract the ip address'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      // Validate that a MAC address is present
      if (message.text.search(new RegExp(/\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/)) !==-1) {
        const data = await getApiIpv4AddressInString(apiUrl,apiJwtToken,message.text);
        const asString = JSON.stringify(data,null,'\t');
        if (isDirectMessage(message.type,["direct_mention","mention"])) {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          await bot.reply(message, asString);
        } else {
          await bot.reply(message, asString);
        }   
      } else {
        if (isDirectMessage(message.type,["direct_mention","mention"])) {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          await bot.reply(message, 'No valid iPv4 Addresses found');
        } else {
          await bot.reply(message, 'No valid iPv4 Addresses found');
        }      
      }
    });

}
