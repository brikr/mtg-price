var _ = require('lodash');
var cors = require('cors');
var express = require('express');
var fs = require('fs');
var http = require('http');

var app = express();
app.use(cors());

try {
  fs.accessSync('AllSets-x.json')
}
catch (err) {
  console.log('missing card data');
  // TODO: synchronously download card data before starting server
  process.exit();
}
var data = JSON.parse(fs.readFileSync('AllSets-x.json'));

app.get('/query/:str', function(req, res) {
  var date = new Date();
  var start = date.getTime();
  var matches = [];
  _.forOwn(data, function(value, key) {
    var setMatches = _.filter(value.cards, function(c) {
      return c.name.toLowerCase().includes(req.params.str.toLowerCase());
    });
    setMatches = _.map(setMatches, function(c) {
      return _.extend({}, c, { set: key });
    });

    matches = _.concat(matches, setMatches);

    if (matches.length > 100) return false;
  });

  console.log('searched for ' + req.params.str + ', ' + 
              matches.length + ' results in ' + 
              (date.getTime() - start) + ' millseconds');
  res.send(matches);
});

app.listen(8081, function() {
  console.log('ready');
});
