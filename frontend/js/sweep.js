define(function(){
  return function(dirX, dirY, degrees){
    var angles = [];
    var resolution = degrees
    
    var radians = degrees*Math.PI/180;
    
    for(var i=-resolution; i<resolution; i++){
      var a = Math.atan2(dirY, dirX) + radians/resolution*i;
      angles.push({
        dirX: Math.cos(a),
        dirY: Math.sin(a)
      });
    }
    
    return angles;
  };
});