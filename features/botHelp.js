const contextualReply = require('../lib/contextualReply.js');

module.exports = function(controller) {
  const generalHelpText = (data) => {
    return {
      greeting: `Hi ${data} I can help you with questions like like the followng:`,
      networkStatus: ["show internet connection health", "show network errors", "show vpn logs", "show dhcp error logs", "show meraki status"],
      clientCounts: ["how many wired clients are there?", "how many wireless client are there?", "how many wireless guest clients are there?", "how many clients are there?"],  
      clientStatus: ["show wired clients", "show wireless clients", "show guest wireless clients", "show network clients [Pat]", "show detailed network clients [Pat]"],
      clientInventory: ["show detailed inventory [Diane]", "show inventory [Diane]"],
      utilities: ["extract mac address from this: 34:17:eb:a2:dc:c6 a8:6b:ad:76:b0:19 48:bf:6b:db:35:bc", "extract mac address from this with cisco format: 3…7:eb:a2:dc:c6 a8:6b:ad:76:b0:19 48:bf:6b:db:35:bc", "extract ip address from this: 192.168.1.1 192.16.1.2, 10.77.11.6", "extract cidr network from this: 192.168.1.1/24", "show version", "hello"],
    };
  };
  controller.hears(
      ['help'], ['direct_message', 'direct_mention', 'mention'],
      async function (bot, message) { 
        if(message.is_echo) return;
        const userData = await bot.api.users.info({user: message.user}, function(err, info){
          //check if it's the right user using info.user.name or info.user.id
          return info.user.name;
        });
        const helpResponse = JSON.stringify(generalHelpText(userData.user.profile.display_name_normalized),null,'\t');
        await contextualReply(bot,message,helpResponse).catch(console.error);      
      });
}
