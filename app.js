const projectEnv = require('dotenv').config();
let { Botkit } = require('botkit');
const fs = require('fs'); // NEW: Add this require (for loading from files).
const getMerakiClients = require('./lib/getMerakiClients.js');
const getMerakiClient = require('./lib/getMerakiClient.js');

const slackToken = projectEnv.parsed.SLACK_TOKEN;
const merakiApiKey = projectEnv.parsed.MERAKI_API_KEY;
const merakiNetworkId = projectEnv.parsed.MERAKI_NETWORK_ID;

//return getMerakiClient(merakiNetworkId,merakiApiKey,'192.168.1.107').then(console.log);


const controller = new Botkit({debug:true,token:slackToken});

// START: Load Slack token from file.
if (!slackToken) {
  console.log('Error: Specify SLACK_TOKEN in environment')
  process.exit(1)
}


controller.hears(
  ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) { bot.reply(message, 'Meow. :smile_cat:') })

controller.hears(
  ['clients'], ['direct_message', 'direct_mention', 'mention'],
  async function (bot, message) { 
    const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
    const asString = JSON.stringify(data,null,'\t');
    return  bot.reply(message, asString) ;
  })