const isDirectMessage = require('./isDirectMessage.js');

module.exports = async function (bot,message,botResponse) {
    const {type,channel,user,incoming_message:{channelData:{ts}}}
    if (isDirectMessage(type,["direct_mention","mention"])) {
        await bot.startConversationInThread(channel, user, ts);
        await bot.reply(message, botResponse);
      } else {
        await bot.reply(message, botResponse);
      }   
};