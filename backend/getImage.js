var request = require('request');

module.exports = function(uri, stream){
  request.head(uri, function(err, res, body){
    request(uri).pipe(stream);
  });
};