const {ipFromString} = require('nodeutilz')
// Custom bot libs
const getMerakiDeviceLossLatency = require('../lib/getMerakiDeviceLossLatency.js');
const getMerakiLogsVpn = require('../lib/getMerakiLogsVpn.js');
const getMerakiLogsDhcp = require('../lib/getMerakiLogsDhcp.js');
const isDirectMessage = require('../lib/isDirectMessage.js');
const sampleDataSet =  require('../lib/sampleDataSet.js');
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
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }      
    });

    controller.hears(
      ['are there network errors', ], ['direct_message', 'direct_mention', 'mention'],
      async function (bot, message) { 
        const userDefinedIp = ipFromString(message.text)[0];
        const data0 = await getMerakiDeviceLossLatency(merakiNetworkId,merakiApiKey,merakiGatwayRouter,publicTestIp,userDefinedIp);
        const data1 = await getMerakiLogsVpn(merakiNetworkId,merakiApiKey);
        const data2 = await getMerakiLogsDhcp(merakiNetworkId,merakiApiKey);
        const {lossHealthStatus, latencyHeathStatus }= data0;
        const vpnErrors = data1.filter((f) => f.msg.toLowerCase().search(new RegExp(/(error|failed|shorter)/)) !== -1);
        const dhcpErrors = sampleDataSet(data2,"description",3);
        const data = [];
        if (lossHealthStatus !== "Healthy") data.push({lossHealthStatus});
        if (latencyHeathStatus !== "Healthy") data.push({latencyHeathStatus});
        if (vpnErrors.length > 0) data.push(vpnErrors);
        if (dhcpErrors.length > 0) data.push(dhcpErrors);
        const asString = JSON.stringify(data,null,'\t');
        if (isDirectMessage(message.type,["direct_mention","mention"])) {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          await bot.reply(message, asString);
        } else {
          await bot.reply(message, asString);
        }      
      });
}
