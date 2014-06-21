define('ajax', ['promise'], function(promise){

  return promise(function(url, resolve, reject){
    console.log("ajax", url);
    var xhr = new XMLHttpRequest();

    xhr.onload = function(){
      console.log(xhr.responseText);
      resolve(JSON.parse(xhr.responseText));
    };

    xhr.onerror = function(){
      console.log("error", xhr.statusText);
    };


    xhr.onreadystatechange = function(){
      console.log("readystate", xhr.readyState, xhr.status);
    };


    xhr.open("get", url, true);
    xhr.send();
  });

    
});
  
  