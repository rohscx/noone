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
require('dotenv').config();

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;

module.exports = function(controller) {
  // gross regex match to ignore any ip address inside of brackets ()
  controller.hears(
    new RegExp(/(lookup|Lookup|look up|Look up|LOOKUP).*(?<!\()\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b(?![\w\s]*[\)])/), ['direct_message', 'direct_mention', 'mention'],
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
    ['show all client details','show all client detail', 'show all clients detailed', 'show all clients detail', 'show client details', 'show me all clients details'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      const         blockBuilder = (data) => {
        return data.reduce((n,o) => {
            const {description,ip,mac,lastSeen,status} = o;
            n.push({"type": "divider"});
            n.push({"type": "section",
                    "fields": [
                    {
                        "type": "plain_text",
                        "text": `${description}`,
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": `${ip}`,
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": `${mac}`,
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": `${lastSeen}`,
                        "emoji": true
                    },
                    {
                        "type": "plain_text",
                        "text": `${status}`,
                        "emoji": true
                    }
                ]});
            n.push({"type": "divider"});
            return n;
        },[]);
    };
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message,{
          blocks: blockBuilder(data)
        });
      } else {
        await bot.reply(message,{
          blocks: blockBuilder(data)
        });
      }
      
    })
  
  controller.hears(
    ['show all client', 'show all clients', 'show me all clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);
      } else {
        await bot.reply(message, asString);
      }
    });

  controller.hears(
    ['show all wireless client', 'show all wireless clients', 'show me all wireless clients'], ['direct_message', 'direct_mention', 'mention'],
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
    ['show all wired client', 'show all wired clients', 'show me all wired clients'], ['direct_message', 'direct_mention', 'mention'],
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
    ['show online clients', 'show clients online','show all clients online'], ['direct_message', 'direct_mention', 'mention'],
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
    ['how many online', 'how many clients','how many users'], ['direct_message', 'direct_mention', 'mention'],
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
    ['how many wireless', 'how many wireless', 'who many wifi'], ['direct_message', 'direct_mention', 'mention'],
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
    ['iPv4 Lookup','iPv4', 'Lookup', 'look up', 'look-up'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, 'Sure, just Direct Message me an iPv4 Address'); 
      } else {
        await bot.reply(message, 'Sure, just Direct Message me an iPv4 Address'); 
      }
    });
}
