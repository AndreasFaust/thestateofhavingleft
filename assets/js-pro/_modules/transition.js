var transe = (function() {

  'use strict';

  var el = document.createElement('fakeelement');
  var domPrefixes = ['Webkit', 'Moz', 'O', 'ms'];
  var cssPrefixes = ['-webkit-', '-moz-', '-o-', '-ms-'];

  var testFeature = function(prop) {
      // unprefixed case
    if (prop in el.style) {
      return {dom: prop, css: prop};
    }
      // test all prefixes
    var i;
    var domProp;
    var domSuffix = '';
    var words = prop.split('-');

    for (i = 0; i < words.length; i++) {
      domSuffix += words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    for (i = 0; i < domPrefixes.length; i++) {
      domProp = domPrefixes[i] + domSuffix;
      if (domProp in el.style) {
        return {dom: domProp, css: cssPrefixes[i] + prop};
      }
    }
    
  };

  function transitionEnd() {

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    };

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return transEndEventNames[name];
      }
    }

    return false; // explicit for ie8 (  ._.)

  }

  // Run feature tests and return
  return {
    transform: testFeature('transform'),
    transition: testFeature('transition'),
    transitionEnd: transitionEnd()
  };

})();
