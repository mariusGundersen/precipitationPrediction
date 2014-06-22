var request = require('request');
var stream = require('stream');
//var through = require('through2');

module.exports = function(uri){
  console.log(uri);
  var through = new stream.Transform();
  through._transform = function(chunk, encoding, callback){
    this.push(chunk);
    callback();
  };
  
  request.head(uri, function(err, res, body){
    request(uri).pipe(through);
  });
  
  return through;
};