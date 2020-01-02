// Custom bot libs
const getMerakiDeviceLossLatency = require('../lib/getMerakiDeviceLossLatency.js');

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;
const merakiGatwayRouter = process.env.MERAKI_GATEWAY_SN;
const publicTestIp = process.env.MERAKI_INTERNET_TEST_IP;

module.exports = function(controller) {

  controller.hears(
    ['internet connection', 'internet health', 'internet connection'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiDeviceLossLatency(merakiNetworkId,merakiApiKey,merakiGatwayRouter,publicTestIp);
      const asString = JSON.stringify(data,null,'\t');
      if (message.type === "direct_mention") {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.startTyping(message, asString);
      } else {
        await bot.startTyping(message, asString);
      }      
    });

}
