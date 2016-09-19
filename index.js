var express = require('express');
var proxy = require('http-proxy-middleware');

var options = {
  logLevel: 'debug',
  target: 'https://api.airtable.com/v0/' + process.env.APP_ID,
  changeOrigin: true,
  headers: {
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + process.env.API_KEY
  },
  pathRewrite: {
    '^/api' : ''
  },
  // http://stackoverflow.com/questions/14262986/node-js-hostname-ip-doesnt-match-certificates-altnames
  // https://github.com/nodejitsu/node-http-proxy/blob/f345a1ac2dde1884e72b952a685a0a1796059f14/lib/http-proxy/common.js#L54
  secure: false,
  ssl: {
    rejectUnauthorized: false
  }
};

var apiProxy = proxy(options);

var app = express();

app.use('/api', apiProxy);

var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Listening on port ' + server.address().port);
});

module.exports = app;
