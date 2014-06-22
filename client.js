var fs = require('fs');
var getAvailableRadar = require('./backend/getAvailableRadar');
var getImage = require('./backend/getImage');
var findRain = require('./backend/findRain');

var fetchAndStore = getAvailableRadar.bind(null, function(err, data){
  fs.writeFile('data/available.json', JSON.stringify(data));
  
  console.log('fetched available json');
  
  data.radar.forEach(function(entry){
    var filename = entry.date.replace(/:/g, '_');
    var isNew = !fs.existsSync('data/images/'+filename+'.gif');
    if(isNew){
      console.log("downloading image ", filename);
      
      getImage(entry.url)
      .pipe(fs.createWriteStream('data/images/'+filename+'.gif')).on('finish', function(){
        findRain('data/images/'+filename+'.gif')
        .pipe(fs.createWriteStream('data/rain/'+filename+'.png'));
      });
    }
  });
  
});

setInterval(fetchAndStore, 1000*60);

fetchAndStore();