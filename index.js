'use strict';

// Imports dependencies and set up http server

const
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express().use(bodyParser.json()), // creates express http server
    request = require("request"),
    User = require("./model/User");
    // Category = require("./model/Category");

// TODO: Key should be somewhere more secure
const YANDEX_KEY = "trnsl.1.1.20191201T001652Z.0fca6bfecef65ae5."+
    "31c828b9dd647dc4b25b13c2aa35342c1eaa3deb\n";
const translate = require("yandex-translate")(YANDEX_KEY)

const config = require("./config");

// Sets server port and logs message on success
app.listen(process.env.PORT || 5000, () => console.log('webhook is listening'));
let pairs = {}; // multiple pairs
let users = {};
let hobbies = [];
let categories = [{}];
// Creates the endpoint for our webhook
app.post('/webhook', (req, res) => {

    let body = req.body;
    console.log("bare minimum");
    // Checks this is an event from a page subscription
    if (body.object === 'page') {
        console.log("inside body.object === page")
        // Iterates over each entry - there may be multiple if batched
        console.log("body is ", body);
        console.log("body-entry is ",body.entry);
        body.entry.forEach(function(entry) {
            // if ("changes" in entry) {
            //     // Handle Page Changes event
            //     let receiveMessage = new Receive();
            //     if (entry.changes[0].field === "feed") {
            //         let change = entry.changes[0].value;
            //         switch (change.item) {
            //             case "post":
            //                 return receiveMessage.handlePrivateReply(
            //                     "post_id",
            //                     change.post_id
            //                 );
            //                 break;
            //             case "comment":
            //                 return receiveMessage.handlePrivateReply(
            //                     "commentgity _id",
            //                     change.comment_id
            //                 );
            //                 break;
            //             default:
            //                 console.log('Unsupported feed change type.');
            //                 return;
            //         }
            //     }
            // }

            // Gets the body of the webhook event
            let webhookEvent = entry.messaging[0];
            console.log(webhookEvent);

            // Discard uninteresting events
            // if ("read" in webhookEvent) {
            //     console.log("Got a read event");
            //     return;
            // }
            //
            // if ("delivery" in webhookEvent) {
            //     console.log("Got a delivery event");
            //     return;
            // }

            // Get the sender PSID
            let senderPsid = webhookEvent.sender.id;

            if (!(senderPsid in users)) {
                addNewUser(senderPsid);

            } else {
                if(users[senderPsid].getrec() == true){
                    addHobbies(webhookEvent.message.text, users[senderPsid]);
                    console.log(users[senderPsid].getHobbies());
                    let temp = compareUsers(user1);
                    // makePair(user1, temp)
                    users[senderPsid].setrec(false);

                }
                else if(webhookEvent.message){
                    handleMessage(senderPsid, webhookEvent.message);
                }
            }
        });
    } else {
        // Returns a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }// Returns a '200 OK' response to all requests

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
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

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

function handleMessage(user1, received_message) {
    let response;
    let user2;
    pairs[user1.pid] = user2;
    if(!user2){
        callSendAPI(user1, "Please wait while you are being matched")
    }
    pairs[user2.pid] = user1;

    // Checks if the message contains text
    if (received_message.text) {
        // Create the payload for a basic text message, which
        // will be added to the body of our request to the Send API
        response = received_message.text;


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
    callSendAPI(user2.pid, response);

    // Send the response message
}

function handlePostback(sender_psid, received_postback) {
    console.log('ok')
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

    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v2.6/me/messages",
        "qs": { "access_token": "EAAjZAZBZC6OgJgBACkgUdAC3sS8IkFhqIAVZBdZAXwP1P4WcbsC9BdZAlxHbZA5QIsNBYqBMSNKSSt6q7o0IhGF76ZBmwTgoRZALfgaJtbwUqyCejy5RyszJmvrcjN1MuZCrKLG8Q7flZAmymHgw2VDkQSLU8mKRVW75JCE9ZBtXd0XSN5xIx5rQSTzm"
        },
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
    let temp = new User.User(pid);
    users[pid] = temp;
    // callUserProfileAPI(pid)
    // temp = Users[pid];
    // temp.setUsername(
    users[pid].setrec(true);
    callSendAPI(pid,"Please list your interests");



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

function addHobbies(stringArrayHobbies,user){
    for(let stringHobby of stringArrayHobbies) {
        if(hobbies.includes(stringHobby)) {
            categories[hobbies.indexOf(stringHobby)].addUser(user);
        }else {
            let category = new Category(stringHobby);
            category.addUser(user);
            categories.push(category);
        }

    }
}


function translator(message, from_lang, to_lang){
    // TODO: Implement after Ray redoes the server stuff
    translate.translate(message, { from: from_lang, to: to_lang }, function(err, res) {
        if (err) {
            console.log(err);
        } else {
            return res.text;
        }
    });
}



