//  =====  Import & Configure Modules  =====
var express = require('express');
var app = express();

//  =====  Import Request library  =====
var reqLib = require('request');

//  =====  Express Route Configuration  =====
app.post('/coffee', (req, res) => {

    // Hit up the giphy api using their public key to get a list of images related to "coffee"
    try {
        reqLib('http://api.giphy.com/v1/gifs/search?q=coffee&api_key=dc6zaTOxFJmzC', function (error, response, body) {
            var giphyImgList = JSON.parse(body).data;
            var randId = Math.round(Math.random() * Math.round(giphyImgList.length - 1));

            // Select the random fixed_width gif from the returned list
            var giphyImg = JSON.parse(body).data[randId].images.fixed_width.url;

            var resPayload = {
                "color": "green",
                "message": giphyImg,
                "notify": false,
                "message_format": "text"
            };

            console.log(req.originalUrl);

            res.status(200).send(resPayload);
        });
    } catch (e) {
        console.log('Error: ', e);
    }
});

//  =====  Configure & Start Express Server  =====
var SERVER_IP = 'localhost';
var SERVER_PORT = 8080;

app.listen(SERVER_PORT, SERVER_IP, () => {
    console.log('Server : http://' + SERVER_IP + ':' + SERVER_PORT);
});
