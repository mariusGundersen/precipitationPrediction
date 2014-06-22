define(function(){
  return function (rain, dirX, dirY, startX, startY){
    for(var i=0; i<200; i++){
      var x = Math.round(startX + dirX*i);
      var y = Math.round(startY + dirY*i);
      
      if(x<0 || x>=rain.width){
        return Infinity 
      }
      
      var isRain = rain.data[(y*rain.width + x)*4];
      rain.data[(y*rain.width + x)*4 + 2] = 0xff;
      if(isRain){
        return i;
      }
    }
    return Infinity;
  };
  
});