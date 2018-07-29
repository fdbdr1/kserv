const express = require('express');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8082;

const app = express();
app.use(bodyParser.json());
app.set({'json escape': true});

let keys = new Array();

// app.post('', (req, res) => {
//     console.log(Math.floor(new Date().getTime()) + " [POST] " + req.url + "\t" + JSON.stringify(req.body));
// });

app.post('/add', (req, res) => {
    console.log(Math.floor(new Date().getTime()) + " [POST] " + req.url + "\t" + JSON.stringify(req.body));

    let newKey = req.body;

    // check if key with content uuid exists
    let indexOfKey = keys.findIndex(object => object.contentId === newKey.contentId);

    // if key doesn't exist, add it
    if(indexOfKey < 0){
        keys.push(newKey);
        console.log(Math.floor(new Date().getTime()) + " new Key added: " + newKey.id);
    }
    res.send(keys);
});

app.post('/get', (req, res) => {
    console.log(Math.floor(new Date().getTime()) + " [POST] " + req.url + "\t" + JSON.stringify(req.body));

    let searchKey = req.body;

    if(searchKey.id){
        let indexOfKey = keys.findIndex(key => key.id === searchKey.id);

        if (indexOfKey < 0){
            res.send("Key with id: " + searchKey.id + "not found.");
        }
        else {
            res.send(keys[indexOfKey]);
        }
    }
    else if(searchKey.contentId){
        res.send(keys.find(key => key.contentId === searchKey.contentId));
    }
});

app.listen(PORT, () => {console.log(Math.floor(new Date().getTime()) + ` listening on port ${PORT}...`)});