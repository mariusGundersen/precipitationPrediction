define('promise', ['when'], function(when){

  return function(promise){
    return function(data){
      if(arguments.length == 0){
        return when.promise(promise);
      }else{
        return when.promise(promise.bind(null, data));
      }
    };
  };

});