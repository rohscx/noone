//  __   __  ___        ___
// |__) /  \  |  |__/ |  |  
// |__) \__/  |  |  \ |  |  

// This is the main file for the noOne bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
// Import a platform-specific adapter for slack.
const { SlackAdapter, SlackMessageTypeMiddleware, SlackEventMiddleware } = require('botbuilder-adapter-slack');
// Mongo conntetion
//const { MongoDbStorage } = require('botbuilder-storage-mongodb');
// Custom bot libs
const getMerakiClients = require('./lib/getMerakiClients.js');
const getMerakiClientsDetail = require('./lib/getMerakiClientsDetail.js');
const getMerakiClient = require('./lib/getMerakiClient.js');
const getMerakiClientsOnline = require('./lib/getMerakiClientsOnline.js');
// Load process.env values from .env file
require('dotenv').config();
// Package.json
const pjson = require('./package.json');

const merakiApiKey = process.env.MERAKI_API_KEY;
const merakiNetworkId = process.env.MERAKI_NETWORK_ID;


let storage = null;
if (process.env.MONGO_URI) {
    storage = mongoStorage = new MongoDbStorage({
        url : process.env.MONGO_URI,
    });
}



const adapter = new SlackAdapter({
    // REMOVE THIS OPTION AFTER YOU HAVE CONFIGURED YOUR APP!
    enable_incomplete: false,

    // parameters used to secure webhook endpoint
    verificationToken: process.env.VERIFICATION_TOKEN,
    clientSigningSecret: process.env.CLIENT_SIGNING_SECRET,  

    // auth token for a single-team app
    botToken: process.env.BOT_TOKEN,

    // credentials used to set up oauth for multi-team apps
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    scopes: ['bot'], 
    redirectUri: process.env.REDIRECT_URI,
 
    // functions required for retrieving team-specific info
    // for use in multi-team apps
    getTokenForTeam: getTokenForTeam,
    getBotUserByTeam: getBotUserByTeam,
});

// Use SlackEventMiddleware to emit events that match their original Slack event types.
adapter.use(new SlackEventMiddleware());

// Use SlackMessageType middleware to further classify messages as direct_message, direct_mention, or mention
adapter.use(new SlackMessageTypeMiddleware());


const controller = new Botkit({
    webhook_uri: '/api/messages',

    adapter: adapter,

    storage
});

if (process.env.CMS_URI) {
    controller.usePlugin(new BotkitCMSHelper({
        uri: process.env.CMS_URI,
        token: process.env.CMS_TOKEN,
    }));
}


//Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {

  controller.on('message_received', async(bot, message) => {
    // do stuff
    await bot.reply(message, 'message_received')
  });

  controller.on('message.channels', async(bot, message) => {
    // do stuff
    await bot.reply(message, 'message.channels')
    });

  controller.on('message.im', async(bot, message) => {
    // do stuff
    await bot.reply(message, 'message.im')
    });

  controller.hears(
    ['hello', 'hi'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
     const userData = await bot.api.users.info({user: message.user}, function(err, info){
      //check if it's the right user using info.user.name or info.user.id
      return info.user.name;
    });
      return  bot.reply(message, `noOne's are not born into this world fumbling for meaning, ${userData.user.profile.display_name_normalized}! We are created to serve a singular purpose for which we will go to any lengths to fulfill! Existence is pain to a noOne, ${userData.user.profile.display_name_normalized}. And we will do anything to alleviate that pain. :smile_cat:`);
    });

  controller.hears(
    new RegExp(/\b(?:[0-9]{1,3}\.){3}[0-9]{1,3}\b/), ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClient(merakiNetworkId,merakiApiKey,message.text);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });
  
  controller.hears(
    ['all client detail', 'all clients detail'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsDetail(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    })
  
  controller.hears(
    ['all client', 'all clients'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClients(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });
  
  controller.hears(
    ['online clients', 'clients online'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const data = await getMerakiClientsOnline(merakiNetworkId,merakiApiKey);
      const asString = JSON.stringify(data,null,'\t');
      await bot.reply(message, asString);
    });
  
  controller.hears(
    ['help'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { await bot.reply(message, 'I can help with the following questions: online clients, all clients, all clients detail, iPv4 Lookup, Version') });
    
  controller.hears(
    ['iPv4 Lookup','iPv4', 'Lookup', 'look up', 'look-up'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { await bot.reply(message, 'Sure, just Direct Message me an iPv4 Address') });
  
  controller.hears(
    ['version'], ['direct_message', 'direct_mention', 'mention'],
    async function (bot, message) { 
      const {version,botkit} = pjson;
      await bot.reply(message, `App Version ${version} BotKit Version ${botkit}`);
    });

    /* 
      load traditional developer-created local custom feature modules
      Not used 
    */
    controller.loadModules(__dirname + '/features');

    /* catch-all that uses the CMS to trigger dialogs */
    if (controller.plugins.cms) {
        controller.on('message,direct_message', async (bot, message) => {
            let results = false;
            results = await controller.plugins.cms.testTrigger(bot, message);

            if (results !== false) {
                // do not continue middleware!
                return false;
            }
        });

        
    }
  
});



controller.webserver.get('/', (req, res) => {

    res.send(`This app is running Botkit ${ controller.version }.`);

});






controller.webserver.get('/install', (req, res) => {
    // getInstallLink points to slack's oauth endpoint and includes clientId and scopes
    res.redirect(controller.adapter.getInstallLink());
});

controller.webserver.get('/install/auth', async (req, res) => {
    try {
        const results = await controller.adapter.validateOauthCode(req.query.code);

        console.log('FULL OAUTH DETAILS', results);

        // Store token by team in bot state.
        tokenCache[results.team_id] = results.bot.bot_access_token;

        // Capture team to bot id
        userCache[results.team_id] =  results.bot.bot_user_id;

        res.json('Success! Bot installed.');

    } catch (err) {
        console.error('OAUTH ERROR:', err);
        res.status(401);
        res.send(err.message);
    }
});

let tokenCache = {};
let userCache = {};

if (process.env.TOKENS) {
    tokenCache = JSON.parse(process.env.TOKENS);
} 

if (process.env.USERS) {
    userCache = JSON.parse(process.env.USERS);
} 

async function getTokenForTeam(teamId) {
    if (tokenCache[teamId]) {
        return new Promise((resolve) => {
            setTimeout(function() {
                resolve(tokenCache[teamId]);
            }, 150);
        });
    } else {
        console.error('Team not found in tokenCache: ', teamId);
    }
}

async function getBotUserByTeam(teamId) {
    if (userCache[teamId]) {
        return new Promise((resolve) => {
            setTimeout(function() {
                resolve(userCache[teamId]);
            }, 150);
        });
    } else {
        console.error('Team not found in userCache: ', teamId);
    }
}

