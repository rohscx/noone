
module.exports = function(controller) {
  const response0 = (data) => {
    return `noOne's are not born into this world fumbling for meaning, ${data}! 
    We are created to serve a singular purpose for which we will go to any lengths to fulfill! Existence is pain to a noOne, ${data}. 
    And we will do anything to alleviate that pain. :smile_cat:`;
  };
    controller.hears(
        ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
        async function (bot, message) { 
         const userData = await bot.api.users.info({user: message.user}, function(err, info){
          //check if it's the right user using info.user.name or info.user.id
          return info.user.name;
        });
        if (message.type === "direct_mention") {
          await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
          return  bot.startTyping(message, response0(userData.user.profile.display_name_normalized));
        } else {
          return  bot.startTyping(message, response0(userData.user.profile.display_name_normalized));
        }    
          
        });
}