
module.exports = function(controller) {
    controller.hears(
        ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { 
         const userData = await bot.api.users.info({user: message.user}, function(err, info){
          //check if it's the right user using info.user.name or info.user.id
          return info.user.name;
        });
          return  bot.reply(message, `noOne's are not born into this world fumbling for meaning, ${userData.user.profile.display_name_normalized}! We are created to serve a singular purpose for which we will go to any lengths to fulfill! Existence is pain to a noOne, ${userData.user.profile.display_name_normalized}. And we will do anything to alleviate that pain. :smile_cat:`);
        });
}