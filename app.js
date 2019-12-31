const projectEnv = require('dotenv').config();
const Botkit = require('botkit')
const fs = require('fs'); // NEW: Add this require (for loading from files).
const getMerakiClients = require('./lib/getMerakiClients.js');
const getMerakiClient = require('./lib/getMerakiClient.js');

const slackToken = projectEnv.parsed.SLACK_TOKEN;
const merakiApiKey = projectEnv.parsed.MERAKI_API_KEY;
const merakiNetworkId = projectEnv.parsed.MERAKI_NETWORK_ID;

//return getMerakiClient(merakiNetworkId,merakiApiKey,'192.168.1.107').then(console.log);


var controller = Botkit.slackbot({debug: false})
controller
  .spawn({
    token: slackToken // Edit this line!
  })
  .startRTM(function (err) {
    if (err) {
      throw new Error(err)
    }
  })

  //f.search(new RegExp(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/)) != -1
controller.hears(
  ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) { bot.reply(message, 'Meow. :smile_cat:') })

controller.hears(
  new RegExp(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/), ['direct_message', 'direct_mention', 'mention'],
  async function (bot, message) { 
    const data = await getMerakiClient(merakiNetworkId,merakiApiKey,message);
    const asString = JSON.stringify(data,null,'\t');
    return  bot.reply(message, asString) ;
  })