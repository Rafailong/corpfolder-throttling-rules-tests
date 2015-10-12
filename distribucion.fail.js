
/**
 prueba de proceso de distribucion
 */
 var fs = require('fs');
 var fail = require('./timesPerH.fail');
 var config = require('./config');

 var requestOpts = {
   url: config.serviceURL.iniciaDistribucion
 };

 fs.readFile('token.json', function (err, data) {
   if (!err) {
     var tokens = JSON.parse(data);
     requestOpts.headers = {
       'Token-Auth': tokens.viewToken,
     };
     return fail(70).sendRequest(requestOpts, 200, 429, null, function callback(err, success) { return; });
   }

   console.error('fail reading token.json file');
   console.error(err);
   return;
 });
