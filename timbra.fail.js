
var fs = require('fs');
var fail360 = require('./360xH.fail');
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
    return fail360.sendRequest(requestOpts, null, null, null, function callback(err, success) { return; });
  }

  console.error('fail reading token.json file');
  console.error(err);
  return;
});
