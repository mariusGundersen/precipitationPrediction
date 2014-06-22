var connect = require('connect');
var getImage = require('./backend/getImage');
var urlrouter = require('urlrouter');
var fs = require('fs');


connect()
.use(urlrouter(function(app){
  app.get('/available', function(req, res, next){
    fs.readFile('data/available.json', function(err, data){
      res.end(data);
    });
  });
  
  app.get('/image/:date', function(req, res, next){
    fs.createReadStream('data/images/' + req.params.date.replace(/:/g, '_')+'.gif').pipe(res);
  });
  
  app.get('/rain/:date', function(req, res, next){
    fs.createReadStream('data/rain/' + req.params.date.replace(/:/g, '_')+'.png').pipe(res);
  });
  
}))
.use(connect.static(__dirname+'/frontend'))
.use(connect.static(__dirname)).listen(80);