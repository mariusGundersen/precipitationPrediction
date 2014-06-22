var http = require('http');
var xml2js = require('xml2js');


function fetch(cb){
  var request = http.get({
    host: 'api.yr.no',
    path: '/weatherapi/radar/1.4/available'
  }).on('response', function(res) {
    
    var data = "";

    res.on('data', function(chunk){
      data += chunk.toString();
    });
    res.on('end', function(){
      var parser = new xml2js.Parser();
      parser.parseString(data, function (err, result) {
        
        if(err){
          cb(err, null);
          return;
        }

        var available = result.available.query.filter(function(query){
          return query.parameter[0].value == 'norway';
        }).filter(function(query){
          return query.parameter[1].value == 'image';
        }).filter(function(query){
          return query.parameter[2].value == 'reflectivity';
        }).filter(function(query){
          return query.parameter[3].value == 'large';
        }).map(function(query){
          return {
            date: query.parameter[4].value[0],
            url: query.uri[0]
          }
        });
        
        cb(null, {radar: available});
      });
    });
  });
}

module.exports = function(cb){
  
  fetch(function(err, data){
    lastFetch = new Date();
    cachedData = data;
    cb(err, data);
  });
  
};