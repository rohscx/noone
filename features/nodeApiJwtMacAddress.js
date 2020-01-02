// Custom bot libs
const getApiMacAddressConversion = require('../lib/getApiMacAddressConversion.js');
const isDirectMessage = require('../lib/isDirectMessage.js');

const apiUrl = process.env.NODEAPPJWT_API_URL;
const apiJwtToken = process.env.NODEAPPJWT_API_AUTH_TOKEN;


module.exports = function(controller) {

  controller.hears(
    ['get mac address','convert the mac address'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getApiMacAddressConversion(apiUrl,apiJwtToken,message.text);
      const asString = JSON.stringify(data,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }      
    });

}
