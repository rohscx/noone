module.exports = function(controller) {
    const generalHelpText = `
    I can help with the following questions: 
    show online clients
    show all clients 
    show all clients detail 
    iPv4 Lookup
    show vpn logs
    determine how many wired clients are online
    detemine how many wireless clients are online
    `;
    controller.hears(
        ['help'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { 
            if (message.type === "direct_mention") {
                await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
                await bot.reply(message, generalHelpText.trim()) 
              } else {
                await bot.reply(message, generalHelpText.trim()) 
              }           
        });
}
