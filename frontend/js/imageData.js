define('imageData', [], function(){
  return function(image){
    var c = document.createElement('canvas');
    var ctx = c.getContext('2d');
    c.width = image.width;
    c.height = image.height;
    ctx.drawImage(image, 0, 0);
    return ctx.getImageData(0, 0, c.width, c.height);
  }
});