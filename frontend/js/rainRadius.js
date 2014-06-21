/*
  
  i=0
  r=1
  X
  
  i=1
  r=3
  s=x-1 => x
  +-+
  | |
  +-+
  
  i=2
  r=5
  s=x-2 => x+1
  +---+
  |   |
  |   |
  |   |
  +---+
  
  
  
*/
define('rainRadius', ['imageData', 'loop', 'rgb2hsv'], function(getImageData, loop, rgb2hsv){
  return function(image, _x, _y){
    var imageData = getImageData(image);

    var rain = [];
    var radius = Math.max(_x, _y, imageData.width - _x, imageData.height - _y);

    loop(radius, function(x, y){
      if(_x + x < 0
         || _x + x > imageData.width
         || _y + y < 0
         || _y + y > imageData.height){
        return
      }
      var r = Math.sqrt(x*x + y*y);
      var index = ((_y+y)*image.width + (_x+x))*4;
      var color = rgb2hsv(imageData.data[index], imageData.data[index+1], imageData.data[index+2]);

      //console.log(_x + x, _y + y, index, imageData.data[index], imageData.data[index+1], imageData.data[index+2]);
      if(color.h < 100 && color.v > 70){
        imageData.data[index+0] = 0xff;
        imageData.data[index+1] = Math.floor(r/radius*255);
        imageData.data[index+2] = 0x00;
        //rain.push({color:color, radius: r});
      }else{
        //console.log(_x+x, _y+y, r, false);
        imageData.data[index+0] = 0x00;
        imageData.data[index+1] = 0x00;
        imageData.data[index+2] = 0x00;
      }
    });

    //rain.sort(function(a, b){
    //  return a.radius - b.radius;
    //});
    //return rain[0];
    return imageData;
  };
});

define('loop', [], function(){
  return function(radius, func){
    for(var r=1; r<radius; r++){
      for(var y=-r; y<r; y++){
        var x = r;
        func(x, y);
      }
      for(var x=r; x>-r; x--){
        var y = r;
        func(x, y);
      }
      for(var y=r; y>-r; y--){
        var x = - r;
        func(x, y);
      }
      for(var x=-r; x<r; x++){
        var y = - r;
        func(x, y);
      }
    }
  };
});