

var config = require('./config');
var Requester = require('./timesPerH.sucess');
var fs = require('fs');

var requestOpts = {
  url: config.serviceURL.generaPDFdeHTML,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};
// fs.readFile('token.json', function (err, data) {
//   if (!err) {
    // var tokens = JSON.parse(data);
    requestOpts.headers['Token-Auth'] ="YVc5eWRHVm5ZU3R6ZEdGbmFXNW5NVUJ1WldGeVluQnZMbU52YlEsYVc5eWRHVm5ZU3R6ZEdGbmFXNW5NVUJ1WldGeVluQnZMbU52YlEsVFVGVFZFVlMsVklFVywxNDQ2MTQxNDg0Mzg2LE1qRjFhWEp2TkRabWMyMHdiMlkyZG10bE9HaGhOMmR3WXpNLHNBSFVrTkM3OHlkMkZFMDctOW5DdTUwSERiSHJwcDFScE05X1Y5Zi1TSWs";
    return Requester(240)
      .sendRequest(requestOpts, null, null, 1000, function callback(err, success) { return; });
  // }

  console.error('fail reading token.json file');
  process.exit(1);
// });
