
/**
 prueba de proceso de distribucion
 */
 var fs = require('fs');
 var success360 = require('./60xH.success');
 var config = require('./config');

 var requestOpts = {
   url: config.serviceURL.iniciaDistribucion,
   method: 'POST'
 };

 fs.readFile('token.json', function (err, data) {
   if (!err) {
     var tokens = JSON.parse(data);
     requestOpts.headers = {
       'Token-Auth': tokens.viewToken,
     };
     return success360.sendRequest(requestOpts, 202, 429, 60000, function callback(err, success) { return; });
   }

   console.error('fail reading token.json file');
   console.error(err);
   return;
 });
