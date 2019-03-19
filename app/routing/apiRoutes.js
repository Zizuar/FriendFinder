var path = require("path");
var express = require('express');
var friends = require('./app/data/friends.json');

module.export = function(app) {
    app.post('/api/friends', function(req, res) {
        var name = req.body.name;
        var photo = req.body.photo;
        var scores = JSON.parse(req.body.scores);
        var threshold = 1000;
        var pointScale;
        for (var i = 0; i < friends.length; i++){
            var loyalTest = friends[i];
            var score = 0;
            for (var challenge = 0; challenge < loyalTest.scores.length; challenge++) {
                score += Math.abs(loyalTest.score[challenge] - scores[challenge]);
            }
            if(score < threshold) {
                threshold = score;
                pointScale = i;
            }
            bestie = {
                "bffID" : loyalTest.name,
                "bffPhoto" : loyalTest.photo,
                "bffScore" : JSON.stringify(friends[pointScale])
            };            
            res.send(friends[bestie]);
        }
    });
};