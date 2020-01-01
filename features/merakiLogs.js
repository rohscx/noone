// Custom bot libs
const getMerakiLogsVpn = require('../lib/getMerakiLogsVpn.js');

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;

module.exports = function(controller) {

  controller.hears(
    ['vpn logs'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiLogsVpn(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data);
      await bot.reply(message, asString);
    });

}
