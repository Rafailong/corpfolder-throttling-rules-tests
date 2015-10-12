/**
 script para mandar 60 request a un servio en menos de 1 Hr
 */

 var EventEmitter = require('events').EventEmitter;
 var request = require('request');
 var config = require('./config');

 function Requester (times) {
   EventEmitter.call(this);
   this.times = times;
 }

 Requester.prototype = Object.create(EventEmitter.prototype);
 Requester.prototype.sendRequest = function (requestOptions, successStatusCode, errorStatusCode, interval, callback) {
   if (!successStatusCode) successStatusCode = 200;
   if (errorStatusCode) errorStatusCode = 429;
   if (!interval) interval = 100;
   return startRequests(requestOptions, successStatusCode, errorStatusCode, interval, callback, times);
 };

 function startRequests(requestOptions, successStatusCode, errorStatusCode, time, callback, times) {
   var counter = 0;
   var emitter = new EventEmitter();
   var interval = setInterval(sendRequest, time); // request every second
   emitter.on('increment', checkCounter);

   function sendRequest () {
   	request(requestOptions, function (err, response, body) {
  	  console.log(response.statusCode);
      if (!err && response.statusCode === successStatusCode) {
        return emitter.emit('increment');
      }

      console.error("ups! :(");
      console.error(err);
      console.log(response.body);
      console.log('clearing interval cuz we had an error!!!');
      clearInterval(interval);
      return callback(null, err);
     });
   }

   function checkCounter () {
     counter++;
     console.log('counter = ' + counter);
     if (counter === times) {
       console.log("let's clear interval :)");
       clearInterval(interval);
       return callback(true, null);
     }
   }
 }

 module.exports = function creator(times) {
   return new Requester(times);
 }
