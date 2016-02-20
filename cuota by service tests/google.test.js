
var EventEmitter = require('events').EventEmitter;
var request = require('request');
var logfmt = require('logfmt');
var uuid = require('uuid');
var async = require('async');
var successStatusCode = 200;
var failStatusCode = 500;
var emitter = new EventEmitter();

var quotaGoogle1WasReseted = false;
var quotaGoogle2WasReseted = false;

var token = uuid.v4();

emitter.on('clearInterval', function (interval, successCounter, failCounter, rOpts, cb) {
  if (failCounter === 10) {
    clearInterval(interval);
    return cb();
  }
});

function sendRequests(rOpts, cb) {
  var successCounter = 0;
  var failCounter = 0;
  var interval = setInterval(function () {
    sendRequest(rOpts);
  }, 1000);

  function sendRequest(opts) {
    var rOpts = opts;
    request(rOpts, function (error, response, body) {
      if (!error && response.statusCode !== failStatusCode) {
        successCounter++;
        logfmt.log({ statusCode: response.statusCode, method: rOpts.method, successCounter: successCounter, token: rOpts.headers['Token-Auth'] });
      } else if (response.statusCode === failStatusCode) {
        failCounter++;
        logfmt.log({ statusCode: response.statusCode, method: rOpts.method, failCounter: failCounter, token: rOpts.headers['Token-Auth']});
      }

      emitter.emit('clearInterval', interval, successCounter, failCounter, rOpts, cb);
    });
  }

  function resetQuota(token, quota, cb) {
    var rOpts = {
      method: 'POST',
      url: 'http://dpineda-apigee-test.nearbpo.com/v1/reset/quota',
      headers: {
        'Token-Auth': token,
        'Quota-Name': quota
      }
    };
    request(rOpts, function (error, response, body) {
      if (!error && response.statusCode === 201) { // success
        return cb();
      }

      logfmt.stringify(error);
      return cb(error);
    });
  }
}

async.series([
  function (cb) {
    var reqOpts = {
      method: 'POST',
      url: 'http://dpineda-apigee-test.nearbpo.com/v1/cuota',
      headers: {
        'Token-Auth': token
      }
    };
    sendRequests(reqOpts, cb);
  },
  function (cb) {
    var reqOpts = {
      method: 'GET',
      url: 'http://dpineda-apigee-test.nearbpo.com/v1/cuota',
      headers: {
        'Token-Auth': 'Desi'
      }
    };
    sendRequests(reqOpts, cb);
  }
]);
