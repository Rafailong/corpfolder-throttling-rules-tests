/**
 * pide token de usuario y token de vista y los manda a un archivo json
 */
var request = require('request');
var fs = require('fs');
var config = require('./config');

function sendRequest(requestOptions, cb) {
  request(requestOptions, function callback(err, res, body) {
    if (!err && res.statusCode === 200) {
      return cb(body);
    }

    console.error('Error status code: ' + res.statusCode);
    console.error('Error response: ' + body);
    console.error(JSON.stringify(err));
    process.exit(1)
  });
}

function getUserToken (cb) {
  var getTokenCallOpts = {
    method: 'POST',
    url: "http://staging.corpfolder.com/api/latest/token",
    json: true,
    body: config.userCredentials
  };
  console.log('geting user token....');
  return sendRequest(getTokenCallOpts, cb);
}

function getTokenViewType(token, callback) {
  var getViewTypeToken = {
    url: "http://staging.corpfolder.com/api/latest/token/organizacion/ravila@nearbpo.com/rol/MASTER",
    headers: { 'Token-Auth': token }
  };
  console.log('getin view type token....');
  return sendRequest(getViewTypeToken, callback);
}


getUserToken(function (tokenResponse) {
  console.log('User Token :' + JSON.stringify(tokenResponse));
  getTokenViewType(tokenResponse.token, function (tokenViewResponse) {
    console.log('Token de Vista:' + JSON.stringify(tokenViewResponse));
  });
});
