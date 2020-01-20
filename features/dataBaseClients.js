const{
  ipFromString,
  flattenArray,
  objectKeyFilter,
} = require('nodeutilz');
const contextualReply = require('../lib/contextualReply.js');


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
      const asString = JSON.stringify(result,null,'\t');
      contextualReply(bot,message,asString);
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
      const asString = JSON.stringify(result,null,'\t');
      contextualReply(bot,message,asString);
    });  
}
