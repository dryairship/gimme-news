import fetch from 'node-fetch';
import config from '../config/config.js';

var usersDict = {};

function sendMessage(recipient, text){
    let requestBody = {
        'messaging_type': 'RESPONSE',
        'recipient': {
            'id': recipient
        },
        'message': {
            'text': text
        }
    };
    fetch(config.graphAPIUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(res => res.json())
    .then(res => console.log(res));
}

function displayHelp(sender){
    sendMessage(sender, "Helllllo");
}

function processMessage(sender, text){
    if(!usersDict[sender]){
        displayHelp(sender);
        usersDict[sender] = true;
    }
}

function verify(req, res){
    let body = req.body;
    if (body.object === 'page') {
        let entry = body.entry[0];
        let event = entry.messaging[0];
        let sender = event.sender.id;
        res.status(200).send('EVENT_RECEIVED');
        if(event.message && event.message.text){
            processMessage(sender, event.message.text);
        }
    } else {
        res.sendStatus(404);
    }
}

export default verify;
