const{
  ipFromString,
  flattenArray
} = require('nodeutilz');
const isDirectMessage = require('../lib/isDirectMessage.js');

// Custom bot libs
const getMerakiClients = require('../lib/getMerakiClients.js');
const getMerakiClientsDetail = require('../lib/getMerakiClientsDetail.js');
const getMerakiClient = require('../lib/getMerakiClient.js');
const getMerakiClientsOnline = require('../lib/getMerakiClientsOnline.js');
const getMerakiClientsOnlineWired = require('../lib/getMerakiClientsOnlineWired.js');
const getMerakiClientsOnlineWireless = require('../lib/getMerakiClientsOnlineWireless.js');
const getMerakiClientsOnlineWirelessGuest = require('../lib/getMerakiClientsOnlineWirelessGuest.js');

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
    ['network client details','network client detail', 'all clients detailed', 'all clients detail', 'show client details', 'show me all clients details', 'show me all network clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      const hyperDenseString = (data) => {
        return data.map(({description,ip,mac,lastSeen,status})=> {
          return `${description}\t${ip}\t${mac}\t${lastSeen}\t${status}`
        }).join('\n\n\n');
      };
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message,asString);
      } else {
        await bot.reply(message,asString);
      }
      
    })
  
  controller.hears(
    ['network client', 'network clients', 'show me network clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      const keyWord = message.text.match(new RegExp(/(?<=\[).+?(?=\])/));
      
      let asString
      if (keyWord){
        const filteredData = data.filter(({description}) => String(description).toLowerCase().search(keyWord[0].toLowerCase()) != -1);
        if (filteredData.length > 0) {
          asString = JSON.stringify(filteredData,null,'\t');
        } else {
          asString = JSON.stringify(data,null,'\t');
        }
      } else {
        asString = JSON.stringify(data,null,'\t');
      }
      
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }
    });

  controller.hears(
    ['wireless client', 'wireless clients', 'the wireless clients', 'wifi clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWireless(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }
      
    });

  controller.hears(
    ['wired client', 'wired network clients', 'the wired clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWired(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }
    });
  
  controller.hears(
    ['the online client', 'clients online','online client',' all clients online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }
    });

  controller.hears(
    ['wireless guest', 'wifi guest'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWirelessGuest(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message,asString);
      } else {
        await bot.reply(message, asString);
      }
      
    });

  controller.hears(
    ['how many online', 'how many clients', 'how many users'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const count = data.length;
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, `${count} clients are online`);
      } else {
        await bot.reply(message, `${count} clients are online`);
      }
      
    });

  controller.hears(
    ['how many wired', 'how many wired clients are online', 'how many wired clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWired(merakiNetworkId,merakiApiKey);
      const count = data.length;
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, `${count} wired clients are online`);
      } else {
        await bot.reply(message, `${count} wired clients are online`);
      }
    });

  controller.hears(
    ['how many wireless', 'how many wifi', 'who many wifi'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWireless(merakiNetworkId,merakiApiKey);
      const count = data.length;
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, `${count} wireless clients are online`);
      } else {
        await bot.reply(message, `${count} wireless clients are online`);
      }
      
    });

  controller.hears(
    ['how many guest', 'how many wireless gurst', 'who many wifi guest'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWirelessGuest(merakiNetworkId,merakiApiKey);
      const count = data.length;
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, `${count} wireless clients are online`);
      } else {
        await bot.reply(message, `${count} wireless clients are online`);
      }
      
    });
    
}
