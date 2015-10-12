/**
 script para mandar 360 request a un servio en menos de 1 Hr
 */

 var EventEmitter = require('events').EventEmitter;
 var request = require('request');
 var config = require('./config');

 function Requester () { }
 Requester.prototype = Object.create(EventEmitter.prototype);
 Requester.prototype.sendRequest = function (requestOptions, successStatusCode, errorStatusCode, interval, callback) {
   if (!successStatusCode) successStatusCode = 200;
   if (errorStatusCode) errorStatusCode = 429;
   if (!interval) interval = 100;
   return startRequests(requestOptions, successStatusCode, errorStatusCode, interval, callback);
 };

 function startRequests(requestOptions, successStatusCode, errorStatusCode, time, callback) {
   var counter = 0;
   var errorCount = 0;
   var emitter = new EventEmitter();
   var interval = setInterval(sendRequest, time); // request every second
   emitter.on('increment', checkCounter);

   function sendRequest () {
   	request(requestOptions, function (err, response, body) {
  	  console.log(response.statusCode);
      if (!err && response.statusCode === successStatusCode) {
        counter++;
        return emitter.emit('increment');
      } else if (error && response.statusCode === errorStatusCode) {
        errorCount++;
        return emitter.emit('increment');
      }

      console.error("ups! :(");
      console.error(err);
      console.log('clearing interval cuz we had an error!!!');
      clearInterval(interval);
      return callback(err);
     });
   }

   function checkCounter () {
     console.log('counter = ' + counter + ' ||| errorCount = ' + errorCount);
     if (errorCount === 5) {
       console.log('got enough expected error :]');
       console.log("let's clear interval :)");
       clearInterval(interval);
       return callback();
     }

     if (counter === 370) {
       console.log("let's clear interval :[ something went wrong");
       clearInterval(interval);
       return callback();
     }
   }
 }

 module.exports = new Requester();
