import fetch from 'node-fetch';
import config from '../config/config.js';
import news from '../services/news.js';

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

function displayHelp(recipient){
    sendMessage(recipient, "Hi! Welcome to GimmeNews. You can send us a topic about which you want some news, and we'll send you news right here.");
}

function displayNews(recipient, topic){
    news.getNewsForKeyword(topic)
    .then(newsResult => {
        if(!newsResult || !newsResult.status || newsResult.status!='ok') {
            sendMessage(recipient, "We're sorry. We had some internal error. Please report this to the developers or try again after some time.");
        } else if(newsResult.totalResults === 0) {
            sendMessage(recipient, "We couldn't find any headlines on that topic.");
        } else {
            let items = newsResult.articles.slice(0, 3);
            items.forEach(item => {
                sendMessage(recipient, `${item.title}\n\n${item.description}\n\nRead more: ${item.url}`);
            });
        }
    });
}

function processMessage(sender, text){
    if(usersDict[sender]) {
        displayNews(sender, text);
    } else {
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
