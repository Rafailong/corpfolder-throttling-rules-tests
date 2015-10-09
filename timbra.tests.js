
var fs = require('fs');
var success360 = require('./360xH.success');
var config = require('./config');
var generadorDeComprobante = require('./utils/generaJsonComprobante/GeneraJsonComprobante');

var requestOpts = {
  url: config.serviceURL.timbraComprobante,
  method: 'POST',
  json: true,
  body: generadorDeComprobante.getJson()
};
console.log(requestOpts.body);
fs.readFile('token.json', function (err, data) {
  if (!err) {
    var tokens = JSON.parse(data);
    requestOpts.headers = {
      'Token-Auth': tokens.viewToken,
      'Content-Type': 'application/json'
    };
    return success360.sendRequest(requestOpts, 200, 429, 10000, function callback(err, success) { return; });
    // return startRequests(requestOptions, successStatusCode, errorStatusCode, interval, callbak);
  }

  console.error('fail reading token.json file');
  console.error(err);
  return;
});
