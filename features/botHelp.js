const isDirectMessage = require('../lib/isDirectMessage.js');

module.exports = function(controller) {
  const generalHelpText = (data) => {
    return `
    Hi ${data} I can help you with questions like like the followng: 
    show online clients on the Meraki
    show network clients on the Meraki
    show network client details on the Meraki
    show wired clients on the Meraki
    show wireless clients on the Meraki
    show wireless guests
    show vpn logs on the Meraki
    show dhcp error logs on the Meraki
    lookup iPv4 Address 192.168.1.17 from Meraki...
    how many wired clients are online are on the Meraki?
    how many wireless clients are online on the Meraki?
    how many clients are online on the Meraki?
    internet connection health on the Meraki Router
    extract mac address i'm giving you...
    extract ip address i'm giving you...
    show your version
    hello noOne
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
