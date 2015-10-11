// Images

(function(window, document, undefined) {
  'use strict';


  var imgWrapper = document.getElementsByClassName('img-wrapper');
  var waypoints = [];

  forEach(imgWrapper, function(i, iw) {

    waypoints[i] = new Waypoint.Inview({
      element: iw,
      enter: function(direction) {
        enter(this.element);
      },
      exited: function(direction) {
        leave(this.element);
      }
    });

  });


  function loadImage (elem) {

    var img = elem.getElementsByTagName('img')[0];
    elem.classList.add('loading');

    var datasrc;

    if ( window.screen.width <= 800 ) {
      datasrc = img.getAttribute('data-src-3');
    } else if ( window.screen.width <= 1600 ) {
      datasrc = img.getAttribute('data-src-2');
    } else {
      datasrc = img.getAttribute('data-src');
    }

    img.setAttribute('src', datasrc);

    imagesLoaded(elem, function() {
      elem.classList.remove('loading');
      elem.classList.add('loaded');
    });

  }

  function enter(elem) {
    elem.classList.add('inview');
    if (elem.classList.contains('loaded')) { return; }
    loadImage(elem);
  }

  function leave(elem) {
    elem.classList.remove('inview');
  }


})(window, document);
