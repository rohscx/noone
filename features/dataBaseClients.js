const{
  ipFromString,
  flattenArray
} = require('nodeutilz');
const isDirectMessage = require('../lib/isDirectMessage.js');
const keyWordSearch = require('../lib/keyWordSearch.js');
const dataBaseSearch = require('../lib/dataBaseSearch.js');
const objectCounter = require('../lib/objectCounter.js');



module.exports = function(controller) {

  
  controller.hears(
    ['show inventory'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const keyWord = message.text.match(new RegExp(/(?<=\[).+?(?=\])/));
      let result;
      if (keyWord){
        result = await dataBaseSearch('tags',keyWord);
      } else {
        result = await dataBaseSearch('tags','.*');
      }
      if (isDirectMessage(message.type,["direct_mention","mention"])) {
        await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      } else {
        await bot.reply(message, JSON.stringify(result, null, '\t'));
      }
    });  
}
