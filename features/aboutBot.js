// Package.json
const pjson = require('../package.json');
const contextualReply = require('../lib/contextualReply.js');

module.exports = function(controller) {
    controller.hears(
        ['version'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { 
            const {version,dependencies} = pjson;
            const aboutResponse = `App Version ${version} BotKit Version ${dependencies.botkit.replace("^","")}`;
            await contextualReply(bot,message,aboutResponse).catch(console.error);
        });
}
