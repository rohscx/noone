/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */
const { SlackDialog } = require('botbuilder-adapter-slack');

module.exports = function(controller) {

    // controller.ready(async () => {
    //     if (process.env.MYTEAM) {
    //         let bot = await controller.spawn(process.env.MYTEAM);
    //         await bot.startConversationInChannel(process.env.MYCHAN,process.env.MYUSER);
    //         bot.say('I AM AWOKEN.');
    //     }
    // });

    // controller.on('direct_message', async(bot, message) => {
    //     await bot.reply(message,'I heard a private message');
    // });

    // controller.hears('dm me', 'message', async(bot, message) => {
    //     await bot.startPrivateConversation(message.user);
    //     await bot.say(`Let's talk in private.`);
    // });

    // controller.on('direct_mention', async(bot, message) => {
    //     await bot.reply(message, `I heard a direct mention that said "${ message.text }"`);
    // });

    // controller.on('mention', async(bot, message) => {
    //     await bot.reply(message, `You mentioned me when you said "${ message.text }"`);
    // });

    // controller.hears('ephemeral', 'message,direct_message', async(bot, message) => {
    //     await bot.replyEphemeral(message,'This is an ephemeral reply sent using bot.replyEphemeral()!');
    // });

    // controller.hears('threaded', 'message,direct_message', async(bot, message) => {
    //     await bot.replyInThread(message,'This is a reply in a thread!');

    //     await bot.startConversationInThread(message.channel, message.user, message.incoming_message.channelData.ts);
    //     await bot.say('And this should also be in that thread!');
    // });

    controller.hears('blocks', 'message', async(bot, message) => {

        await bot.reply(message,{
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "We found *205 Hotels* in New Orleans, LA from *12/14 to 12/17*"
                    },
                    "accessory": {
                        "type": "overflow",
                        "options": [
                            {
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Option One"
                                },
                                "value": "value-0"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Option Two"
                                },
                                "value": "value-1"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Option Three"
                                },
                                "value": "value-2"
                            },
                            {
                                "text": {
                                    "type": "plain_text",
                                    "emoji": true,
                                    "text": "Option Four"
                                },
                                "value": "value-3"
                            }
                        ]
                    }
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*<fakeLink.toHotelPage.com|Windsor Court Hotel>*\n★★★★★\n$340 per night\nRated: 9.4 - Excellent"
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_1.png",
                        "alt_text": "Windsor Court Hotel thumbnail"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "image",
                            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                            "alt_text": "Location Pin Icon"
                        },
                        {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Location: Central Business District"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*<fakeLink.toHotelPage.com|The Ritz-Carlton New Orleans>*\n★★★★★\n$340 per night\nRated: 9.1 - Excellent"
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_2.png",
                        "alt_text": "Ritz-Carlton New Orleans thumbnail"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "image",
                            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                            "alt_text": "Location Pin Icon"
                        },
                        {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Location: French Quarter"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "*<fakeLink.toHotelPage.com|Omni Royal Orleans Hotel>*\n★★★★★\n$419 per night\nRated: 8.8 - Excellent"
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_3.png",
                        "alt_text": "Omni Royal Orleans Hotel thumbnail"
                    }
                },
                {
                    "type": "context",
                    "elements": [
                        {
                            "type": "image",
                            "image_url": "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                            "alt_text": "Location Pin Icon"
                        },
                        {
                            "type": "plain_text",
                            "emoji": true,
                            "text": "Location: French Quarter"
                        }
                    ]
                },
                {
                    "type": "divider"
                },
                {
                    "type": "actions",
                    "elements": [
                        {
                            "type": "button",
                            "text": {
                                "type": "plain_text",
                                "emoji": true,
                                "text": "Next 2 Results"
                            },
                            "value": "click_me_123"
                        }
                    ]
                },
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "You can add an image next to text in this block."
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://api.slack.com/img/blocks/bkb_template_images/plants.png",
                        "alt_text": "plants"
                    }
                }
            ]
        });

    });

    // controller.on('block_actions', async (bot, message) => {
    //     await bot.reply(message, `Sounds like your choice is ${ message.incoming_message.channelData.actions[0].value }`)
    // });

    // controller.on('slash_command', async(bot, message) => {
    //     if (message.text === 'plain') {
    //         await bot.reply(message, 'This is a plain reply');
    //     } else if (message.text === 'public') {
    //         await bot.replyPublic(message, 'This is a public reply');
    //     } else if (message.text === 'private') {
    //         await bot.replyPrivate(message, 'This is a private reply');
    //     }

    //     // set http status
    //     bot.httpBody({text:'You can send an immediate response using bot.httpBody()'});

    // });

    // controller.on('interactive_message', async (bot, message) => {

    //     console.log('INTERACTIVE MESSAGE', message);

    //     switch(message.actions[0].name) {
    //         case 'replace':
    //             await bot.replyInteractive(message,'[ A previous message was successfully replaced with this less exciting one. ]');
    //             break;
    //         case 'dialog':
    //             await bot.replyWithDialog(message, new SlackDialog('this is a dialog', '123', 'Submit', [
    //                 {
    //                     type: 'text',
    //                     label: 'Field 1',
    //                     name: 'field1',
    //                 },
    //                 {
    //                     type: 'text',
    //                     label: 'Field 2',
    //                     name: 'field2',
    //                 }
    //             ]).notifyOnCancel(true).state('foo').asObject());
    //             break;
    //         default:
    //             await bot.reply(message, 'Got a button click!');
    //     }
    // });


    // controller.on('dialog_submission', async (bot, message) => {
    //     await bot.reply(message, 'Got a dialog submission');

    //     // Return an error to Slack
    //     bot.dialogError([
    //         {
    //             "name": "field1",
    //             "error": "there was an error in field1"
    //         }
    //     ])
    // });

    // controller.on('dialog_cancellation', async (bot, message) => {
    //     await bot.reply(message, 'Got a dialog cancellation');
    // });

}