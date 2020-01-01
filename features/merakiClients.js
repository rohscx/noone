// Custom bot libs
const getMerakiClients = require('../lib/getMerakiClients.js');
const getMerakiClientsDetail = require('../lib/getMerakiClientsDetail.js');
const getMerakiClient = require('../lib/getMerakiClient.js');
const getMerakiClientsOnline = require('../lib/getMerakiClientsOnline.js');
const getMerakiClientsWired = require('../lib/getMerakiClientsWired.js');
const getMerakiClientsWireless = require('../lib/getMerakiClientsWireless.js');
require('dotenv').config();

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;

module.exports = function(controller) {

  controller.hears(
    new RegExp(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/), ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClient(merakiNetworkId,merakiApiKey,message.text);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });
  
  controller.hears(
    ['all client detail', 'all clients detail'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    })
  
  controller.hears(
    ['all client', 'all clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });
  
  controller.hears(
    ['online clients', 'clients online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });

  controller.hears(
    ['how many online', 'how many clients are online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const count = data.length;
      await bot.reply(message, `${count} clients are online`);
    });

  controller.hears(
    ['how many wired online', 'how many wired clients are online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsWired(merakiNetworkId,merakiApiKey);
      const count = data.length;
      await bot.reply(message, `${count} wired clients are online`);
    });

  controller.hears(
    ['how many wireless online', 'how many wireless clients are online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsWireless(merakiNetworkId,merakiApiKey);
      const count = data.length;
      await bot.reply(message, `${count} wireless clients are online`);
    });
    
  controller.hears(
    ['iPv4 Lookup','iPv4', 'Lookup', 'look up', 'look-up'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { await bot.reply(message, 'Sure, just Direct Message me an iPv4 Address') });
}
