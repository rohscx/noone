// Custom bot libs
const getMerakiClients = require('../lib/getMerakiClients.js');
const getMerakiClientsDetail = require('../lib/getMerakiClientsDetail.js');
const getMerakiClient = require('../lib/getMerakiClient.js');
const getMerakiClientsOnline = require('../lib/getMerakiClientsOnline.js');
const getMerakiClientsOnlineWired = require('../lib/getMerakiClientsOnlineWired.js');
const getMerakiClientsOnlineWireless = require('../lib/getMerakiClientsOnlineWireless.js');
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
    ['show all client details','show all client detail', 'show all clients detailed'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    })
  
  controller.hears(
    ['show all client', 'show all clients', 'show me all clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });
  
  controller.hears(
    ['show online clients', 'show clients online','show all clients online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });

  controller.hears(
    ['how many online', 'how many clients','how many users'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const count = data.length;
      await bot.reply(message, `${count} clients are online`);
    });

  controller.hears(
    ['how many wired online', 'how many wired clients are online', 'how many wired clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWired(merakiNetworkId,merakiApiKey);
      const count = data.length;
      await bot.reply(message, `${count} wired clients are online`);
    });

  controller.hears(
    ['how many wireless users', 'how many wireless clients', 'who many wifi clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWireless(merakiNetworkId,merakiApiKey);
      const count = data.length;
      await bot.reply(message, `${count} wireless clients are online`);
    });
    
  controller.hears(
    ['iPv4 Lookup','iPv4', 'Lookup', 'look up', 'look-up'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { await bot.reply(message, 'Sure, just Direct Message me an iPv4 Address') });
}
