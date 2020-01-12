const{
  ipFromString,
  flattenArray
} = require('nodeutilz');
const isDirectMessage = require('../lib/isDirectMessage.js');
const keyWordSearch = require('../lib/keyWordSearch.js');
const dataBaseSearch = require('../lib/dataBaseSearch.js');
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
      const dbLookup = await Promise.all(flatData.map(async (d) => {
        if (d.description) {
          const db = await dataBaseSearch('name', d.description);
          console.log(db)
          if (db.length > 0) {
            const { name, serialNumber, inService, tags } = db;
            console.log(d)
            return { ...d, db };
          }
          else {
            
            return d;
          }
        }
        else {
          return d;
        }
      }));
      //const data = await getMerakiClient(merakiNetworkId,merakiApiKey,message.text);
      const asString = JSON.stringify(dbLookup,null,'\t');
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, asString);   
      } else {
        await bot.reply(message, asString);
      }
    });
  
  controller.hears(
    ['how many wired client', 'how many wired host', 'count wired client', 'count wired host'], ['direct_message', 'direct_mention', 'mention'],
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
    ['how many wireless client', 'how many wireless users' , 'how many wifi client', 'how many wifi host', 'count wireless client', 'count wifi clients', 'count wifi host', 'count wifi user'], ['direct_message', 'direct_mention', 'mention'],
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
    ['how many wireless guest client', 'how many wireless guest host', 'how many wifi guest client', 'how many wifi guest host', 'count wifi guest client', 'count wifi guest host', 'count wifi guest user'], ['direct_message', 'direct_mention', 'mention'],
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
    ['how many client', 'how many users', 'how may host'], ['direct_message', 'direct_mention', 'mention'],
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

  // controller.hears(
  //   ['how many wired client', 'count wired client', 'count the wired client', 'count of the wired client'], ['direct_message', 'direct_mention', 'mention'],
  //   async function (bot, message) { 
  //     const data = await getMerakiClientsWired(merakiNetworkId,merakiApiKey);
  //     const count = objectCounter(data,"wiredClientCount",{asString:true});
  //     if (isDirectMessage(message.type,["direct_mention","mention"])) {
  //       await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
  //       await bot.reply(message, count);
  //     } else {
  //       await bot.reply(message, count);
  //     }
  //   });

  // controller.hears(
  //   ['how many wireless client', 'count wireless client', 'count of the wireless', 'how many wifi client'], ['direct_message', 'direct_mention', 'mention'],
  //   async function (bot, message) { 
  //     const data = await getMerakiClientsWireless(merakiNetworkId,merakiApiKey);
  //     const count = objectCounter(data,"wirelessClientCount",{asString:true});
  //     if (isDirectMessage(message.type,["direct_mention","mention"])) {
  //       await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
  //       await bot.reply(message, count);
  //     } else {
  //       await bot.reply(message, count);
  //     }
  //   });

  // controller.hears(
  //   ['how many client', 'count client', 'count of the network clients',], ['direct_message', 'direct_mention', 'mention'],
  //   async function (bot, message) { 
  //     const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
  //     const count = objectCounter(data,"wirelessClientCount",{asString:true});
  //     if (isDirectMessage(message.type,["direct_mention","mention"])) {
  //       await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
  //       await bot.reply(message, count);
  //     } else {
  //       await bot.reply(message, count);
  //     }
  //   });

  controller.hears(
    ['show wired client', 'show wired network client'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWired(merakiNetworkId,merakiApiKey);
      const keyWordResult = await keyWordSearch(data,"description",message.text);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      } else {
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      }
    });

  controller.hears(
    ['show wireless client', 'show wireless host', 'show wireless user', 'show wifi client', 'show wifi host', 'show wifi user'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWireless(merakiNetworkId,merakiApiKey);
      const keyWordResult = await keyWordSearch(data,"description",message.text);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      } else {
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      }
      
    });

  controller.hears(
    ['show guest wireless client', 'show guest wifi host', 'show guest wifi user'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnlineWirelessGuest(merakiNetworkId,merakiApiKey);
      const keyWordResult = await keyWordSearch(data,"description",message.text);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      } else {
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      }
      
    });
  
  controller.hears(
    ['show detailed network client', 'show detailed network host', 'show detailed network user', 'show all network client', 'show all network host', 'show all network user'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const hyperDenseString = (data) => {
        return data.map(({description,ip,mac,lastSeen,status})=> {
          return `${description}\t${ip}\t${mac}\t${lastSeen}\t${status}`
        }).join('\n\n\n');
      };
      const keyWordResult = await keyWordSearch(data,"description",message.text);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      } else {
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      }
      
    });

  controller.hears(
    ['show network client','show network host', 'show network user'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const keyWordResult = await keyWordSearch(data,"description",message.text);
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      } else {
        await bot.reply(message, JSON.stringify(keyWordResult,null,'\t'));
      }
    });

  // controller.hears(
  //   ['network client', 'network clients'], ['direct_message', 'direct_mention', 'mention'],
  //   async function (bot, message) { 
  //     const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
  //     if (isDirectMessage(message.type,["direct_mention","mention"])) {
  //       await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
  //       await bot.reply(message, keyWordSearch(data,"description",message.text));
  //     } else {
  //       await bot.reply(message, keyWordSearch(data,"description",message.text));
  //     }
  //   });
    
}
