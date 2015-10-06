/**
 * prueba para el servicio de version de proxy en apigee de corpfolder.
 * esta prueba tarda 1 Hr. es el caso exitoso de 240 llamadas a la api.
 */
var EventEmitter = require('events').EventEmitter;
var request = require('request');
var counter = 0;
var interval = setInterval(sendRequest, 6000);
var emitter = new EventEmitter();

emitter.on('increment', checkCounter);

function sendRequest () {
	request.get('http://ravila-apigee-test.nearbpo.com/v1/crapfolder/version')
    .on('response', function (response) {
      console.log(response.statusCode);
      emitter.emit('increment');
    })
    .on('error', function (err) {
      console.error("ups! :(");
      console.error(err);
			console.log('clearing interval cuz we had an error!!!');
      clearInterval(interval);
    });
};

function checkCounter () {
  counter++;
  console.log('counter = ' + counter);
  if (counter === 240) {
    console.log("let's clear interval :)");
    clearInterval(interval);
  }
}
