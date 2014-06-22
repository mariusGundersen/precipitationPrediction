var rgb2hsv = require('./rgb2hsv');
var getPixels = require('get-pixels');
var savePixels = require('save-pixels');
var fs = require('fs');
var Transform = require('stream').Transform;

module.exports = function(filename){
  console.log("gif decode", filename);
  
  var through = new Transform();
  through._transform = function(chunk, encoding, callback){
    this.push(chunk);
    callback();
  };
  
  getPixels(filename, function(err, pixels){
    
    if(err){
      throw new Error(err);
    }
        
    findRainInImageData(pixels)
    
    savePixels(pixels, "png").pipe(through);
    
    console.log("foundRain");
    
  });
  
  return through;
  
};
  
function findRainInImageData(pixels){
  for(var y=0; y<pixels.shape[0]; y++){
    for(var x=0; x<pixels.shape[1]; x++){
      var color = rgb2hsv(pixels.get(y, x, 0), pixels.get(y, x, 1), pixels.get(y, x, 2));
      if(color.h < 100 && color.v > 70){
        pixels.set(y, x, 0, 0xff);
        pixels.set(y, x, 1, 0x00);
        pixels.set(y, x, 2, 0x00);
      }else{
        pixels.set(y, x, 0, 0x00);
        pixels.set(y, x, 1, 0x00);
        pixels.set(y, x, 2, 0x00);
      }
    }
  }

  return pixels;
};


function toThreeBytes(byte){
  return [
    (byte >> 16) & 0xff,
    (byte >>  8) & 0xff,
    (byte >>  0) & 0xff
  ]
}