//  =====  Import & Configure Modules  =====
var express = require('express');
var app = express();

//  =====  Import Request library  =====
var reqLib = require('request');

const green = "green";
const red = "red";

//  =====  Utility Functions  =====
var genPayload = function (color, message, notify, message_format) {
    var resPayload = {
        "color": color,
        "message": message,
        "notify": notify,
        "message_format": message_format
    };

    return resPayload;
};

//  =====  Express Route Configuration  =====
app.get('/', (req, res) => {
    res.status(200).send('It is working');
});

app.post('/coffee', (req, res) => {

    // Hit up the giphy api using their public key to get a list of images related to "coffee"
    try {
        reqLib('http://api.giphy.com/v1/gifs/search?q=coffee&api_key=dc6zaTOxFJmzC', function (error, response, body) {
            var giphyImgList = JSON.parse(body).data;
            var randId = Math.round(Math.random() * Math.round(giphyImgList.length - 1));

            // Select the random fixed_width gif from the returned list
            var giphyImg = JSON.parse(body).data[randId].images.fixed_width.url;

            var resPayload = genPayload(green, '@here Who wants to get some: ' + giphyImg, false, "text");

            console.log(req.originalUrl);

            res.status(200).send(resPayload);
        });
    } catch (e) {
        console.log('Error: ', e);
        res.status(200).send(genPayload(red, "Call failed", false, "text"));
    }

});

//  =====  Start Express Server  =====
var SERVER_PORT = process.env.PORT || 8080;

app.listen(SERVER_PORT, () => {
    console.log('Server : http://localhost:' + SERVER_PORT);
});
