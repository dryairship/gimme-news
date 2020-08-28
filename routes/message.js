
function verify(req, res){
    let body = req.body;
    if (body.object === 'page') {
        let entry = body.entry[0];
        let event = entry.messaging[0];
        if(event.message && event.message.text){
            console.log(event.message.text);
        }
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
}

export default verify;
