(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define([], function(){
      return(root.fileto = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node
    module.exports = factory();
  } else {
    // Browser globals
    root.fileto = factory();
  }
}(typeof self !== 'undefined' ? self : this, function(){
  function object(file){
    return {
      name: file.name,
      lastModified: file.lastModified,
      size: file.size,
      type: file.type
    };
  }

  function string(file){
    return JSON.stringify(object(file));
  }

  function promise(file, readAs){
    return new Promise(function(resolve, reject){
      var output = object(file);
      var reader = new FileReader();
      reader.onload = function(e){
        output.contents = e.target.result;
        resolve(output);
      }
      if(!readAs) readAs = 'Text';
      reader['readAs'+readAs](file);
    });
  }

  return {
    object,
    string,
    promise
  };
}));
