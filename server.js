var connect = require('connect');
var getAvailableRadar = require('./getAvailableRadar');
var getImage = require('./getImage');
var urlrouter = require('urlrouter');


connect()
.use(urlrouter(function(app){
  app.get('/available', function(req, res, next){
    getAvailableRadar(function(err, data){
      res.end(JSON.stringify(data));
    });
  });
  app.get('/image/', function(req, res, next){
    console.dir(req);
    getImage('http://api.yr.no/weatherapi/radar/1.4/' + req._parsedUrl.search, res);
  });
  
}))
.use(connect.static(__dirname)).listen(80);