const {ipFromString} = require('nodeutilz')
// Custom bot libs
const getMerakiDeviceLossLatency = require('../lib/getMerakiDeviceLossLatency.js');
const isDirectMessage = require('../lib/isDirectMessage.js');

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
        const {lossHealthStatus, latencyHeathStatus }= data0
        const sample =  (data,sampleKey,sampleSize = 3) => {
          const keys = [];
          return data.reduce((n,o,i) => {
            if(i > 0) {
              if(!keys.includes(o[sampleKey])) n.push(o);
              return n;
            } else {
              keys.push(o[sampleKey]);
              n.push(o);
              return n;
            }
          },[]).filter((f,i) => i+1 < sampleSize)
        };
        const data = [lossHealthStatus,latencyHeathStatus,data1.filter((f) => f.msg.toLowerCase().search('error') !== -1),sample(data2,"description",3)];
        const asString = JSON.stringify(data,null,'\t');
        if (isDirectMessage(message.type,["direct_mention","mention"])) {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          await bot.reply(message, asString);
        } else {
          await bot.reply(message, asString);
        }      
      });
}
