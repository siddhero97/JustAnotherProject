'use strict';

// Imports dependencies and set up http server

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()); // creates express http server

// TODO: Put in real Yandex key
const YANDEX_KEY = "dummy-key";
const translate = require(yandex-translate)(YANDEX_KEY);

const config = require("./services/config");

// Sets server port and logs message on success
app.listen(process.env.PORT || 5000, () => console.log('webhook is listening'));
let pairs = {}; // multiple pairs
let users = {};
let hobbies = [];
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

    let body = req.body;
    // Checks this is an event from a page subscription
    if (body.object === 'page') {

        // Iterates over each entry - there may be multiple if batched
        body.entry.forEach(function(entry) {

            // Gets the message. entry.messaging is an array, but
            // will only ever contain one message, so we get index 0
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);
        });

        // Returns a '200 OK' response to all requests
        res.status(200).send('EVENT_RECEIVED');
    }
    let webhookEvent = entry.messaging[0];
    // console.log(webhookEvent);

    // Discard uninteresting events
    if ("read" in webhookEvent) {
        // console.log("Got a read event");
        return;
    }

    if ("delivery" in webhookEvent) {
        // console.log("Got a delivery event");
        return;
    }

    // Get the sender PSID
    let senderPsid = webhookEvent.sender.id;

    if (!(senderPsid in users)) {
        let user = new User(senderPsid);

        GraphAPi.getUserProfile(senderPsid)
            .then(userProfile => {
                user.setProfile(userProfile);
            })
            .catch(error => {
                // The profile is unavailable
                console.log("Profile is unavailable:", error);
            })
            .finally(() => {
                users[senderPsid] = user;
                i18n.setLocale(user.locale);
                console.log(
                    "New Profile PSID:",
                    senderPsid,
                    "with locale:",
                    i18n.getLocale()
                );
                let receiveMessage = new Receive(users[senderPsid], webhookEvent);
                return receiveMessage.handleMessage();
            });
    } else {
        i18n.setLocale(users[senderPsid].locale);
        console.log(
            "Profile already exists PSID:",
            senderPsid,
            "with locale:",
            i18n.getLocale()
        );
        let receiveMessage = new Receive(users[senderPsid], webhookEvent);
        return receiveMessage.handleMessage();
    }
else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
});

// Adds support for GET requests to our webhook
app.get('/webhook', (req, res) => {

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "verified";
    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' ) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
});

// const login = require("facebook-chat-api");
//
// // Create simple echo bot
// login({email: "FB_EMAIL", password: "FB_PASSWORD"}, (err, api) => {
//     if(err) return console.error(err);
//
//     api.listen((err, message) => {
//         api.sendMessage(message.body, message.threadID);
//     });
// });

function handleMessage(sender_psid, received_message) {
    let response;
    pairs[user1.pid] = user2;
    pairs[user2.pid] = user1;

    // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = {
            "text": `You sent the message: "${received_message.text}". Now send me an attachment!`
        }


    } else if (received_message.attachments) {
        // Get the URL of the message attachment
        response = received_message.attachments[0].payload.url;
        // response = {
        //     "attachment": {
        //         "type": "template",
        //         "payload": {
        //             "template_type": "generic",
        //             "elements": [{
        //                 "title": "Is this the right picture?",
        //                 "subtitle": "Tap a button to answer.",
        //                 "image_url": attachment_url,
        //                 "buttons": [
        //                     {
        //                         "type": "postback",
        //                         "title": "Yes!",
        //                         "payload": "yes",
        //                     },
        //                     {
        //                         "type": "postback",
        //                         "title": "No!",
        //                         "payload": "no",
        //                     }
        //                 ],
        //             }]
        //         }
        //     }
        }
    callSendAPI(recive_psid, response);

    // Send the response message
}

function handlePostback(sender_psid, received_postback) {
    console.log('ok');
    let response;
    // Get the payload for the postback
    let payload = received_postback.payload;

    // Set the response based on the postback payload
    if (payload === 'yes') {
        response = { "text": "Thanks!" }
    } else if (payload === 'no') {
        response = { "text": "Oops, try sending another image." }
    }
    // Send the message to acknowledge the postback
    callSendAPI(sender_psid, response);
}

function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    }

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": PAGE_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}


function getUserProfile(senderPsid) {
    try {
        const userProfile = this.callUserProfileAPI(senderPsid);

        for (const key in userProfile) {
            const camelizedKey = camelCase(key);
            const value = userProfile[key];
            delete userProfile[key];
            userProfile[camelizedKey] = value;
        }
    }}

// function callUserProfileAPI(senderPsid) {
//     let body = [];
//
//     // Send the HTTP request to the Graph API
//     ${config.mPlatfom}/${senderPsid}
//     request({
//         uri: `${config.mPlatfom}/${senderPsid}`,
//         qs: {
//             access_token: config.pageAccesToken,
//             fields: "first_name, last_name, gender, locale, timezone"
//         },
//         method: "GET"
//     })
// }

function makePair(user1, user2){
    pairs[user1.pid] = user2;
    pairs[user2.pid] = user1;
}
function addNewUser(pid){
    let temp = User(pid);
    users[pid] = temp;
    // callUserProfileAPI(pid)
    // temp = Users[pid];
    // temp.setUsername(

}
function compareUsers(user1){
    if(!users.contains(user1)) {
        return;
    }
    let userHobbies = user1.getHobbies();
    for(let user of users) {
        for(let hobby of userHobbies) {
            if(user.getHobbies().includes(hobby)) {
                    return hobby;
            }
        }
    }
    return null;
}

function addHobbies(stringArrayHobbies){
    let tempHobby;
    for(let stringHobby of stringArrayHobbies) {
        tempHobby = new Hobby(stringHobby);

    }
}


function translator(message, lang){
    // TODO: Implement after Ray redoes the server stuff
    return message
}


var listener = app.listen(config.port, function() {
    console.log("Your app is listening on port " + listener.address().port);

    if (

        config.appUrl &&
        config.verifyToken
    ) {
        console.log(
            "Is this the first time running?\n" +
            "Make sure to set the both the Messenger profile, persona " +
            "and webhook by visiting:\n" +
            config.appUrl +
            "/profile?mode=all&verify_token=" +
            config.verifyToken
        );
    }

    if (config.pageId) {
        console.log("Test your app by messaging:");
        console.log("https://m.me/" + config.pageId);
    }
});
