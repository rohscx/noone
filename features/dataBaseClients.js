const{
  ipFromString,
  flattenArray,
  objectKeyFilter,
} = require('nodeutilz');
const isDirectMessage = require('../lib/isDirectMessage.js');
const keyWordSearch = require('../lib/keyWordSearch.js');
const objectCounter = require('../lib/objectCounter.js');


// Custom bot libs
const getDataBaseInventoryItem = require('../lib/getDataBaseInventoryItem.js');


module.exports = function(controller) {
  controller.hears(
    ['show inventory'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const keyWord = message.text.match(new RegExp(/(?<=\[).+?(?=\])/));
      let result;
      if (keyWord){
        result = await getDataBaseInventoryItem('tags',keyWord)
          .then((t) => t.map(({name,serialNumber,serviceTag,notes,purchaseDateTime,inService,tags}) => ({name,notes:notes.map(({note}) => note),tags,serviceTag})));
      } else {
        result = await getDataBaseInventoryItem('tags','.*')
          .then((t) => t.map(({name,serialNumber,serviceTag,notes,purchaseDateTime,inService,tags}) => ({name,notes:notes.map(({note}) => note),tags,serviceTag})));
      }
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      } else {
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      }
    });  
  
  controller.hears(
    ['show detailed inventory'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const keyWord = message.text.match(new RegExp(/(?<=\[).+?(?=\])/));
      let result;
      if (keyWord){
        result = await getDataBaseInventoryItem('tags',keyWord)
          .then((t) => t.map(({name,serialNumber,serviceTag,notes,purchaseDateTime,inService,tags}) => ({name,inService,notes,tags,purchaseDateTime,serviceTag,serialNumber})));
      } else {
        result = await getDataBaseInventoryItem('tags','.*')
          .then((t) => t.map(({name,serialNumber,serviceTag,notes,purchaseDateTime,inService,tags}) => ({name,inService,notes,tags,purchaseDateTime,serviceTag,serialNumber})));
      }
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      } else {
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      }
    });  
}
