const path = require('path');
const express = require('express');
const app = express();


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

app.get('*', function(req, res) {
	res.sendFile('index.html', {root: __dirname});
});

var port = process.env.PORT || 5000;
app.listen(port);

console.log('Woop! Woop! Join the party on localhost: ' + port);

exports = module.exports = app;