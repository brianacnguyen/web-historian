var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var header = httpHelpers.headers;
// require more modules/folders here!


var sendResponse = function(res, statusCode, data) {
  res.writeHead(statusCode, header);
  res.end();
}
var actions = {
  'GET': function(req, res) {
  	if (req.url === '/'){
  		header['Content-Type'] = "text/html";
  		fs.readFile('web/public/index.html', 'utf8', function(err, data) {
  			if (err) throw err;
  			res.writeHead(200, header);
  			res.end(data);
  		});
  	}
  	else if (req.url === '/www.google.com') {
  		header['Content-Type'] = "text/html";
  		fs.readFile('archives/sites' + req.url, 'utf8', function(err, data) {
  			if (err) throw err;
  			res.writeHead(200, header);
  			res.end(data);
  		});
  	}
  },
  'POST': function(req, res) {
  },
  'OPTIONS': function(req, res) {
    sendResponse(res, 200, null);
  }
}

exports.handleRequest = function (req, res) {
  console.log("Serving request type " + req.method + " for url " + req.url);
  var action = actions[req.method];
  if (action) {
    action(req, res);
  } else {
    sendResponse(res, 400, null);
  }
};