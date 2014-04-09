var connect = require('connect');
var getAvailableRadar = require('./getAvailableRadar');


connect()
.use(function(req, res, next){
  if(req.url != "/available"){
    next();
    return;
  }
  getAvailableRadar(function(err, data){
    res.end(JSON.stringify(data));
  });
  
  
})
.use(connect.static(__dirname)).listen(80);