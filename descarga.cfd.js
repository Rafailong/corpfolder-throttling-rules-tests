/**
 prueba para el servicio de descarga xml de un comprobante
 de proxy en apigee de corpfolder.
 esta prueba tarda 1 Hr. es el caso exitoso de 240 llamadas a la api.
 */
var EventEmitter = require('events').EventEmitter;
var fs = require('fs');
var request = require('request');
var config = require('./config');
var counter = 0;
var emitter = new EventEmitter();

emitter.on('startRequests', startRequests);

function startRequests(tokens) {
  emitter.on('increment', checkCounter);

  var interval = setInterval(sendRequest, 15000); // set to send a request every 15 seconds cuz YOLO (15s * 240 = 3600s / 60 = 60 min)
  var j = request.jar();
  j.setCookie(request.cookie('CF_Token-Auth='+tokens.viewToken), 'http://ravila-apigee-test.nearbpo.com');
  var requestOpts = {
    url: config.serviceURL.descargaXML,
    headers: {
      'Cookie': 'CF_Token-Auth='+tokens.viewToken,
      'Accept': "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
    },
    jar: j
  };

  function sendRequest () {
  	request(requestOpts, function (err, response, body) {
  	  console.log(response.statusCode);
      if (!err && response.statusCode === 200) {
        emitter.emit('increment');
      } else {
        console.error("ups! :(");
        console.error(err);
        console.log('clearing interval cuz we had an error!!!');
        clearInterval(interval);
      }
    });
  }

  function checkCounter () {
    counter++;
    console.log('counter = ' + counter);
    if (counter === 250) {
      console.log("let's clear interval :)");
      clearInterval(interval);
    }
  }
}

fs.readFile('token.json', function (err, data) {
  if (!err) {
    var tokens = JSON.parse(data);
    return emitter.emit('startRequests', tokens);
  }

  console.error('fail reading token.json file');
  console.error(err);
  process.exit(1);
});
