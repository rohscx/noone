const {ipFromString} = require('nodeutilz')
// Custom bot libs
const getMerakiDeviceLossLatency = require('../lib/getMerakiDeviceLossLatency.js');

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;
const merakiGatwayRouter = process.env.MERAKI_GATEWAY_SN;
const publicTestIp = process.env.MERAKI_INTERNET_TEST_IP;

module.exports = function(controller) {

  controller.hears(
    ['internet connection health', 'internet status', 'internet connection status'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const userDefinedIp = ipFromString(message.text)[0];
      const data = await getMerakiDeviceLossLatency(merakiNetworkId,merakiApiKey,merakiGatwayRouter,publicTestIp,userDefinedIp);
      
      const asString = JSON.stringify(data,null,'\t');
      if (message.type === "direct_mention") {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }      
    });

}
