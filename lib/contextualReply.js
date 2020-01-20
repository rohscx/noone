const isDirectMessage = require('./isDirectMessage.js');

module.exports = async function (bot,message,botResponse) {
    const {type,channel,user,incoming_message:{channelData:{ts}}} = message;
    if (isDirectMessage(type,["direct_mention","mention"])) {
        await bot.startConversationInThread(channel, user, ts);
        await bot.reply(message, botResponse).catch(console.log);
      } else {
        await bot.reply(message, botResponse).catch(console.log);
      }   
};