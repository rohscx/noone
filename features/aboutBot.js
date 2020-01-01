// Package.json
const pjson = require('../package.json');

module.exports = function(controller) {
    controller.hears(
        ['version'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { 
            const {version,dependencies} = pjson;
            if (message.type === "direct_mention") {
                await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
                await bot.reply(message, `App Version ${version} BotKit Version ${dependencies.botkit}`);
              } else {
                await bot.reply(message, `App Version ${version} BotKit Version ${dependencies.botkit}`);
              }      
        });
}
