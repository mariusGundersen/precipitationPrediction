this.onmessage = function(event){
  var result = rainRadius(event.data.imageData, event.data.x, event.data.y);
  
  postMessage({
    id: event.data.id,
    imageData: event.data.imageData
  });
}


function rainRadius(imageData, _x, _y){

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
    var index = ((_y+y)*imageData.width + (_x+x))*4;
    var color = rgb2hsv(imageData.data[index], imageData.data[index+1], imageData.data[index+2]);

    //console.log(_x + x, _y + y, index, imageData.data[index]);
    if(color.h < 100 && color.v > 70){
      imageData.data[index+0] = 0xff;
      imageData.data[index+1] = Math.floor(r/radius*255);
      imageData.data[index+2] = 0x00;
      //rain.push({color:color, radius: r});
    }else{
      //console.log(_x+x, _y+y, r, false);
      imageData.data[index+0] = 0x00
      imageData.data[index+1] = 0x00
      imageData.data[index+2] = 0x00
    }
  });

  var index = ((_y)*imageData.width + (_x))*4;
  imageData.data[index+0] = 0xff;
  imageData.data[index+1] = 0xff;
  imageData.data[index+2] = 0xff;
  
  //rain.sort(function(a, b){
  //  return a.radius - b.radius;
  //});
  //return rain[0];
  return imageData;
}


function loop(radius, func){
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

function rgb2hsv () {
  var rr, gg, bb,
      r = arguments[0] / 255,
      g = arguments[1] / 255,
      b = arguments[2] / 255,
      h, s,
      v = Math.max(r, g, b),
      diff = v - Math.min(r, g, b),
      diffc = function(c){
          return (v - c) / 6 / diff + 1 / 2;
      };

  if (diff == 0) {
      h = s = 0;
  } else {
      s = diff / v;
      rr = diffc(r);
      gg = diffc(g);
      bb = diffc(b);

      if (r === v) {
          h = bb - gg;
      }else if (g === v) {
          h = (1 / 3) + rr - bb;
      }else if (b === v) {
          h = (2 / 3) + gg - rr;
      }
      if (h < 0) {
          h += 1;
      }else if (h > 1) {
          h -= 1;
      }
  }
  return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100)
  };
}

function splitBytes(bytes){
  return [
    (bytes>> 0) & 0xff,
    (bytes>> 8) & 0xff,
    (bytes>>16) & 0xff,
    (bytes>>24) & 0xff
  ];
}

function combineBytes(bytes){
  (255      << 24) | // alpha
  (bytes[2] << 16) | // blue
  (bytes[1] <<  8) | // green
   bytes[0];         // red
}