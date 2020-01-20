const contextualReply = require('../lib/contextualReply.js');

// Custom bot libs
const getMerakiLogsVpn = require('../lib/getMerakiLogsVpn.js');
const getMerakiLogsDhcp = require('../lib/getMerakiLogsDhcp.js');

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;

module.exports = function(controller) {

  controller.hears(
    ['show vpn logs'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiLogsVpn(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      contextualReply(bot,message,asString);
    });

    controller.hears(
      ['show dhcp error logs', 'show dhcp error'], ['direct_message', 'direct_mention', 'mention'],
      async function (bot, message) { 
        const data = await getMerakiLogsDhcp(merakiNetworkId,merakiApiKey);
        const asString = JSON.stringify(data,null,'\t');
        contextualReply(bot,message,asString); 
      });
}
