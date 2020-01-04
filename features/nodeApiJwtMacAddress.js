// Custom bot libs
const getApiMacAddressInString = require('../lib/getApiMacAddressInString.js');
const isDirectMessage = require('../lib/isDirectMessage.js');

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
        if (isDirectMessage(message.type,["direct_mention","mention"])) {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          await bot.reply(message, asString);
        } else {
          await bot.reply(message, asString);
        }   
      } else {
        if (isDirectMessage(message.type,["direct_mention","mention"])) {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          await bot.reply(message, 'No valid MAC Addresses found');
        } else {
          await bot.reply(message, 'No valid MAC Addresses found');
        }      
      }
    });

}
