const isDirectMessage = require('../lib/isDirectMessage.js');

module.exports = function(controller) {
  const generalHelpText = (data) => {
    return `
    I can help with the following questions: 
    show online clients
    show all clients 
    show all clients detail
    show all wired clients
    show all wireless clients
    show vpn logs 
    how many wired clients are online
    how many wireless clients are online
    how many clients are online
    internet connection health
    iPv4 Lookup
    show your version
    hello
    `;
  };
  controller.hears(
      ['help'], ['direct_message', 'direct_mention', 'mention'],
      async function (bot, message) { 
        const userData = await bot.api.users.info({user: message.user}, function(err, info){
          //check if it's the right user using info.user.name or info.user.id
          return info.user.name;
        });
          if (isDirectMessage(message.type,["direct_mention","mention"])) {
              await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
              await bot.reply(message, generalHelpText(userData.user.profile.display_name_normalized).trim()) 
            } else {
              await bot.reply(message, generalHelpText(userData.user.profile.display_name_normalized).trim()) 
            }           
      });
}
