var fs = require('fs');
var getAvailableRadar = require('./backend/getAvailableRadar');
var getImage = require('./backend/getImage');

var fetchAndStore = getAvailableRadar.bind(null, function(err, data){
  fs.writeFile('data/available.json', JSON.stringify(data));
  
  data.radar.map(function(entry){
    entry.filename = entry.date.replace(/:/g, '_')+'.png';
    getImage(entry.url, fs.createWriteStream('data/images/'+entry.filename));
    return entry;
  });
});

setInterval(fetchAndStore, 1000*60);

fetchAndStore();