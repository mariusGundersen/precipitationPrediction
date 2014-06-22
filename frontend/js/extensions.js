
Number.range = function(from, to){
  var ret = [];
  for(var i=from; i<to; i++){
    ret.push(i);
  }
  return ret;
};
  
  
Object.defineProperty(Array.prototype, "select", {
  enumerable: false,
  writable: true,
  value: function(prop){
    return this.map(function(entry){
      return entry[prop];
    })
  }
});

Object.defineProperty(Array.prototype, "skip", {
  enumerable: false,
  writable: true,
  value: function(n){
    return this.filter(function(e, i){
      return i>=n;
    })
}
});

Object.defineProperty(Array.prototype, "sum", {
  enumerable: false,
  writable: true,
  value: function(){
    return this.reduce(function(a,b){
      return a+b;
    }, 0)
  }
});