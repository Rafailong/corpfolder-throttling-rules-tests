
/**
 * Prueba que verifica que las regla de 240 llamadas a la api por hora sea
 * verdad jeje. Caso fallido donde no puede hacer mas de 240 llamadas en 1 Hr.
 */

var EventEmitter = require('events').EventEmitter;
var request = require('request');
var utilities = require('./utilities');
var errorCounter = counter = 0;
var calloptions = {
  url: 'http://ravila-apigee-test.nearbpo.com/v1/crapfolder/version',
  headers: {
    'Token-Auth': 'ravila@nearbpo.com'
  }
};
var emitter = new EventEmitter();

emitter.on('increment', checkCounter);

function checkCounter () {
  console.log('counter = ' + counter);
  if (counter === 500) {
    console.log("let's clear interval :)");
    clearInterval(failInterval);
  }
}

var callApi = function () {
  request.get(calloptions)
    .on('response', function onResponse(response) {
      console.log(response.statusCode);
      counter++;
      emitter.emit('increment');
    })
    .on('error', function onError(err) {
      console.error("ups! :(");
      console.error(err);
			console.log('clearing interval cuz we had an error!!!');
      errorCounter++;
      emitter.emit('increment');
    });
};

var failInterval = setInterval(callApi, 100);
