define(['sweep', 'nearestRain', 'plot', 'linearBestFit'], function(sweep, nearestRain, plot, linearBestFit){
  
  return function(images, x, y, dirX, dirY){
    
    var points = images.map(function(image){
      return sweep(dirX, dirY, 360/16/2).map(function(dir){
        return {x: image.date.valueOf(), y: nearestRain(image.rainData, dir.dirX, dir.dirY, x, y)};
      });
    }).map(function(entries){
      return {
        x: entries[0].x, 
        y: entries
          .select("y")
          .filter(function(e){
            return e != Infinity;
          })
          .sort()
          .skip(1)
          .reverse()
          .skip(1)
       };
    }).filter(function(entry){
      return entry.y.length>0;
    }).map(function(entry){
      return {
        x: entry.x,
        y: entry.y.sum()/entry.y.length
      };
    });

    var bestFit = linearBestFit(points.map(function(entry){
      return {x: entry.x, y: entry.y};
    }));
    
    return {
      willHappen: bestFit.m < 0,
      date: new Date(bestFit.x),
      error: Math.log(bestFit.e),
      points: points.map(function(entry){
        return {x: entry.x/1000, y: entry.y};
      })
    };
  };
  
  
});