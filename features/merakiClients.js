const{
  ipFromString,
  flattenArray
} = require('nodeutilz');
const isDirectMessage = require('../lib/isDirectMessage.js');
const keyWordSearch = require('../lib/keyWordSearch.js');
const objectCounter = require('../lib/objectCounter.js');

// Custom bot libs
const getMerakiClients = require('../lib/getMerakiClients.js');
const getMerakiClientsDetail = require('../lib/getMerakiClientsDetail.js');
const getMerakiClient = require('../lib/getMerakiClient.js');
const getMerakiClientsOnline = require('../lib/getMerakiClientsOnline.js');
const getMerakiClientsOnlineWired = require('../lib/getMerakiClientsOnlineWired.js');
const getMerakiClientsOnlineWireless = require('../lib/getMerakiClientsOnlineWireless.js');
const getMerakiClientsOnlineWirelessGuest = require('../lib/getMerakiClientsOnlineWirelessGuest.js');
const getMerakiClientsWired = require('../lib/getMerakiClientsWired.js');
const getMerakiClientsWireless = require('../lib/getMerakiClientsWireless.js');

require('dotenv').config();

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;

module.exports = function(controller) {
  // gross regex match to ignore any ip address inside of brackets ()
  controller.hears(
    new RegExp(/(lookup|Lookup|look up|Look up|LOOKUP|who has ip).*(?<!\()\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b(?![\w\s]*[\)])/), ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const ipAddresses = ipFromString(message.text,{onlyIp:false});
      const data = await Promise.all(ipAddresses.map((data) => getMerakiClient(merakiNetworkId,merakiApiKey,data)));
      const flatData = flattenArray(data);
      //const data = await getMerakiClient(merakiNetworkId,merakiApiKey,message.text);
      const asString = JSON.stringify(flatData,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);   
      } else {
        await bot.reply(message, asString);
      }
    });
  
  controller.hears(
    ['how many wired clients online', 'how many wired clients are online', 'how many wired clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWired(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"wiredClientCountOnline",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
    });

  controller.hears(
    ['how many wireless clients are online', 'how many wifi clients are online',], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWireless(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"wirelessClientCountOnline",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
      
    });

  controller.hears(
    ['how many guest online', 'how many guests online', 'how many guests are online','how many wireless guests online', ], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWirelessGuest(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"wirelessGuestClientCountOnline",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
      
    });
    
  controller.hears(
    ['how many clients are online', 'how many clients', 'how many users'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"clientCountOnline",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
      
    });

  controller.hears(
    ['how many wired client', 'count wired client', 'count the wired client', 'count of the wired client'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsWired(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"wiredClientCount",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
    });

  controller.hears(
    ['how many wireless client', 'count wireless client', 'count of the wireless', 'how many wifi client'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsWireless(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"wirelessClientCount",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
    });

  controller.hears(
    ['how many client', 'count client', 'count of the network clients',], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      const count = objectCounter(data,"wirelessClientCount",{asString:true});
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, count);
      } else {
        await bot.reply(message, count);
      }
    });

  controller.hears(
    ['wired client', 'wired network clients', 'the wired clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWired(merakiNetworkId,merakiApiKey);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      } else {
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      }
    });

  controller.hears(
    ['wireless client', 'wireless clients', 'the wireless clients', 'wifi clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWireless(merakiNetworkId,merakiApiKey);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      } else {
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      }
      
    });

  controller.hears(
    ['guest wireless client', 'guest wifi client'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWirelessGuest(merakiNetworkId,merakiApiKey);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message,keyWordSearch(data,"description",message.text));
      } else {
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      }
      
    });
  
  controller.hears(
    ['network client detail', 'network clients detail', 'network client detailed'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const hyperDenseString = (data) => {
        return data.map(({description,ip,mac,lastSeen,status})=> {
          return `${description}\t${ip}\t${mac}\t${lastSeen}\t${status}`
        }).join('\n\n\n');
      };
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message,keyWordSearch(data,"description",message.text));
      } else {
        await bot.reply(message,keyWordSearch(data,"description",message.text));
      }
      
    });

  controller.hears(
    ['network client online','network clients online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      } else {
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      }
    });

  controller.hears(
    ['network client', 'network clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      } else {
        await bot.reply(message, keyWordSearch(data,"description",message.text));
      }
    });
    
}
