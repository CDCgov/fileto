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
  var fileto = {};

  fileto.object = function(file){
    return {
      name: file.name,
      lastModified: file.lastModified,
      size: file.size,
      type: file.type
    };
  };

  fileto.string = function(file){
    return JSON.stringify(fileto.object(file));
  };

  fileto.callback = function(file, callback, readAs){
    var output = fileto.object(file);
    var reader = new FileReader();
    reader.onload = function(e){
      output.contents = e.target.result;
      callback(output);
    }
    if(!readAs) readAs = 'Text';
    reader['readAs'+readAs](file);
  };

  fileto.promise = function(file, readAs){
    if(!readAs) readAs = 'Text';
    if(Promise){
      return new Promise(function(resolve, reject){
        fileto.callback(file, resolve, readAs);
      });
    } else {
      return {
        then: function(cb){
          fileto.callback(file, cb, readAs);
          return {catch: function(){}};
        }
      };
    }
  };

  return fileto;
}));
