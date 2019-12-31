const projectEnv = require('dotenv').config();
const Botkit = require('botkit');
const fs = require('fs'); // NEW: Add this require (for loading from files).
const getMerakiClients = require('./lib/getMerakiClients.js');
const getMerakiClient = require('./lib/getMerakiClient.js');

const slackToken = projectEnv.parsed.SLACK_TOKEN;
const merakiApiKey = projectEnv.parsed.MERAKI_API_KEY;
const merakiNetworkId = projectEnv.parsed.MERAKI_NETWORK_ID;

return getMerakiClient(merakiNetworkId,merakiApiKey,'192.168.1.107').then(console.log);


const controller = Botkit.slackbot({debug: false})

// START: Load Slack token from file.
if (!process.env.SLACK_TOKEN) {
  console.log('Error: Specify SLACK_TOKEN in environment')
  process.exit(1)
}

fs.readFile(process.env.SLACK_TOKEN, function (err, data) {
  if (err) {
    console.log('Error: Specify token in SLACK_TOKEN file')
    process.exit(1)
  }
  data = String(data)
  data = data.replace(/\s/g, '')
  controller
    .spawn({token: data})
    .startRTM(function (err) {
      if (err) {
        throw new Error(err)
      }
    })
})
// END: Load Slack token from file.

controller.hears(
  ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
  function (bot, message) { bot.reply(message, 'Meow. :smile_cat:') })