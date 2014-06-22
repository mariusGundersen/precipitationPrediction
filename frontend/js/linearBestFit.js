define(function(){
  
  return function(values){
    
    var n = values.length;
    
    var x = values.map(function(entry){
      return entry.x;
    });
    
    var y = values.map(function(entry){
      return entry.y;
    });
    
    var xy = values.map(function(entry){
      return entry.x * entry.y;
    });
    
    var x2 = x.map(function(x){
      return x*x;
    });
    
    var sumX = sum(x);
    
    var sumY = sum(y);
    
    var sumXY = sum(xy);
    
    var sumX2 = sum(x2);
    
    var m = (sumXY - sumX*sumY/n)/(sumX2 - sumX*sumX/n);
    
    var avgX = sumX/n;
    
    var avgY = sumY/n;
    
    var b = avgY - m*avgX;
    
    var x0 = -b/m; 
    
    var e = values.map(function(entry){
      return entry.y - (b + entry.x*m);
    });
    
    var e2 = e.map(function(e){
      return e*e;
    });
    
    var sumE2 = sum(e2);
        
    return {
      m: m,
      b: b,
      e: sumE2,
      x: x0
    };
  };
  
  function sum(values){
    return values.reduce(function(a, b){
      return a + b; 
    }, 0);
  }
  
});
