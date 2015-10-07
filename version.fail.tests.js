
/**
 * Prueba que verifica que las regla de 240 llamadas a la api por hora sea
 * verdad jeje. Caso fallido donde no puede hacer mas de 240 llamadas en 1 Hr.
 */

var EventEmitter = require('events').EventEmitter;
var request = require('request');
var config = require('./config');
var uuid = require('uuid');
var errorCounter = 0;
var counter = 0;
var calloptions = {
  url: config.serviceURL.version,
  headers: {
    'Token-Auth': uuid.v4()
  }
};
var emitter = new EventEmitter();
emitter.on('increment', function checkCounter () {
  console.log('counter = ' + counter + "  |||| errorCounter = " + errorCounter);
  if (counter === 300) { // limite de 300 llamadas
    console.log("let's clear interval :)");
    clearInterval(failInterval);
  } else if (errorCounter === 5) {
    console.log("let's clear interval :), we got lots of expected errors :D");
    clearInterval(failInterval);
  }
});

var callApi = function () {
  request.get(calloptions, function (error, response, body) {
    console.log(response.statusCode);
    if (!error && response.statusCode >= 200 && response.statusCode <= 299) {
      counter++;
    } else if (response.statusCode === config.statusCodes.quotaViolation) {
      errorCounter++;
    }

    emitter.emit('increment');
  });
};

// se mandara una llamada a la api cada 100 milisegundos.
var failInterval = setInterval(callApi, 100);
