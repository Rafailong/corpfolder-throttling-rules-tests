
var config = require('./config');
var Requester = require('./timesPerH.fail');
var fs = require('fs');

var requestOpts = {
  url: config.serviceURL.version,
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
};
fs.readFile('token.json', function (err, data) {
  if (!err) {
    var tokens = JSON.parse(data);
    requestOpts.headers['Token-Auth'] = tokens.viewToken;
    return Requester(10)
      .sendRequest(requestOpts, null, 423, 10000, function callback(err, success) { return; });
  }

  console.error('fail reading token.json file');
  process.exit(1);
});
