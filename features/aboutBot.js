// Package.json
const pjson = require('../package.json');

module.exports = function(controller) {
    controller.hears(
        ['version'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { 
            const {version,botkit} = pjson;
            await bot.reply(message, `App Version ${version} BotKit Version ${botkit}`);
        });
}
