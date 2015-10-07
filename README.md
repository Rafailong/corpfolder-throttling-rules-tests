# corpfolder-throttling-rules-tests

El modulo config.js solo exporta datos de config en la siguiente forma

`
module.exports = {
   serviceURL: {
     version: 'http://url.de/version'
   },
   statusCodes: {
     quotaViolation: 429
   }
 };
 `
