const path = require('path');
const express = require('express');
const app = express();

app.get('*', function(req, res) {
	res.sendFile('index.html');
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('Woop! Woop! Join the party on localhost: ' + port);

exports = module.exports = app;