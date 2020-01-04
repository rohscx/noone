const isDirectMessage = require('../lib/isDirectMessage.js');

module.exports = function(controller) {
  const generalHelpText = (data) => {
    return `
    Hi ${data} I can help you with questions like like the followng: 
    how many wired clients are there?
    how many wireless client are there?
    how many wireless guest clients are there?
    how many clients are there?
    show wired clients
    show wireless clients
    show guest wireless clients
    show network clients
    show detailed network clients
    show internet connection health
    show network errors
    show vpn logs
    show dhcp error logs
    extract mac address from this: 34:17:eb:a2:dc:c6 a8:6b:ad:76:b0:19 48:bf:6b:db:35:bc
    extract mac address from this with cisco format: 34:17:eb:a2:dc:c6 a8:6b:ad:76:b0:19 48:bf:6b:db:35:bc
    extract ip address from this: 192.168.1.1 192.16.1.2, 10.77.11.6 
    show version
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
