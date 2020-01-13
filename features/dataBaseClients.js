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
          .then((t) => Promise.all(t.map((d) => objectKeyFilter(d,["name","serialNumber","assetNumber","notes","purchaseDateTime","inService","tags"]))));
      } else {
        result = await getDataBaseInventoryItem('tags','.*')
          .then((t) => Promise.all(t.map((d) => objectKeyFilter(d,["name","serialNumber","assetNumber","notes","purchaseDateTime","inService","tags"]))));
      }
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      } else {
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      }
    });  
}
