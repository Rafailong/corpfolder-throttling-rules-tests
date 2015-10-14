
var config = require('./config');
var Requester = require('./timesPerH.sucess');
var fs = require('fs');

var requestOpts = {
  url: config.serviceURL.descargaZIP,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};
fs.readFile('token.json', function (err, data) {
  if (!err) {
    var tokens = JSON.parse(data);
    requestOpts.headers['Token-Auth'] = tokens.viewToken;
    return Requester(6)
      .sendRequest(requestOpts, null, null, 600000, function callback(err, success) { return; });
  }

  console.error('fail reading token.json file');
  process.exit(1);
});
