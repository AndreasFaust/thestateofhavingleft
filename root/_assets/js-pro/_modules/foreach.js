
function forEach (array, callback, scope) {
  'use strict';
  for (var i = 0, j=array.length; i < j ; i++) {
    callback.call(scope, i, array[i]);
  }
}


