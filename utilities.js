
var request = require('request');

module.exports = {
  customClearInterval: function customClearInterval(interval) {
    console.log('clearing interval...');
    clearInterval(interval);
  }
};
