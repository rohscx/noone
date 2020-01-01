// Custom bot libs
const getMerakiLogsVpn = require('../lib/getMerakiLogsVpn.js');

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;
const merakiGatwayRouter = process.env.MERAKI_GATEWAY_SN;

module.exports = function(controller) {

  controller.hears(
    ['vpn logs'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiLogsVpn(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      if (message.type === "direct_mention") {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }      
    });

}
