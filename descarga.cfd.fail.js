/**
 * tests de fallo para el servicio de descarga de comprobante en xml/pdf
 */
 var EventEmitter = require('events').EventEmitter;
 var fs = require('fs');
 var request = require('request');
 var config = require('./config');

 var emitter = new EventEmitter();
 emitter.on('startRequests', startRequests);

 function startRequests(tokens) {
   var counter = 0;
   var errorCount = 0;
   emitter.on('increment', checkCounter);

   var interval = setInterval(sendRequest, 1000); // request every second
   var j = request.jar();
   j.setCookie(request.cookie('CF_Token-Auth='+tokens.viewToken), 'http://ravila-apigee-test.nearbpo.com');
   var requestOpts = {
     url: config.serviceURL.descargaPDF,
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
         return emitter.emit('increment');
       } else if (response.statusCode === 249) {
         errorCount++;
         return emitter.emit('increment');
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
     console.log('counter = ' + counter + '||| errorCount = ' + errorCount);
     if (counter === 250) {
       console.log("let's clear interval :)");
       clearInterval(interval);
     }

     if (errorCount === 5) {
       console.log('got enough expected error, let\'s clear the interval');
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
