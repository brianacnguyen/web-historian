var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var httpRequest = require('http-request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
	fs.readFile(exports.paths.list, 'utf8', function(err, data) {
		var joinedData = data.split('\n');
		callback(joinedData); 
	});
};

exports.isUrlInList = function(target, callback){
	exports.readListOfUrls(function(data) {
		var result;
		if (data.indexOf(target) === -1) {
			result = false;
		}
		else {
			result = true;
		}
		callback(result); 
	})
};

exports.addUrlToList = function(url, callback){
	fs.appendFile(exports.paths.list, url + '\n', 'utf8', function(err){
		if (err) {
			throw err;
		}
	});
	callback(exports.paths.list);
};

exports.isUrlArchived = function(target, callback){
	fs.open(exports.paths.archivedSites + target, 'r', callback)
};

exports.downloadUrls = function(urlArray){
	for (var i = 0; i < urlArray.length; i ++) {
		var url = urlArray[i];
		httpRequest.get(url, function(err, res){
			if (err){
				console.log(err);
			}
			fs.writeFile(exports.paths.archivedSites + '/' + url, res.buffer.toString());

		})		
	}
	// _.each(urlArray, function(url) {
	// 	httpRequest.get(url, function(err, res){
	// 		if (err){
	// 			console.log(err);
	// 		}
	// 		fs.writeFile(exports.paths.archivedSites + '/' + url, res.buffer.toString());

	// 	})
	// })
};
