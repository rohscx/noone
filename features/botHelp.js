module.exports = function(controller) {
    controller.hears(
        ['help'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { await bot.reply(message, 'I can help with the following questions: online clients, all clients, all clients detail, iPv4 Lookup, Version') });
}
