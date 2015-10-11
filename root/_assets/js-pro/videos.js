

// Play and Pause Videos

(function(window, document, undefined) {
  'use strict';

  var arbeit = document.getElementsByClassName('arbeit');
  var vids = document.getElementsByTagName('video');
  var vidimg = document.getElementsByClassName('video-img');
  var videoWaypoints = [];

  if( Modernizr.video && !Modernizr.touchevents && !Modernizr.pointerevents ) { 

    forEach(vids, function(i,vid) {

      videoWaypoints[i] = new Waypoint.Inview({
        element: vid,
        enter: function(direction) {
          vid.classList.add('inview');
          vid.play();
        },
        exited: function(direction) {
          vid.classList.remove('inview');
          vid.pause();
        }
      });

    });

  } else {

    // Substitution for Mobile

    forEach(arbeit, function(i, ar) {
      var vid = ar.getElementsByTagName('video')[0];
      if(vid) { ar.removeChild(vid); }
    });

    forEach(vidimg, function(i, vi) {
      vi.classList.remove('hide');
      videoWaypoints[i] = new Waypoint.Inview({
        element: vi,
        enter: function(direction) {
          enter(this.element);
        },
        exited: function(direction) {
          leave(this.element);
        }
      });

    });

  }

  function loadImage (elem) {

    var img = elem.getElementsByTagName('img')[0];
    elem.classList.add('loading');

    var datasrc;

    if ( window.screen.width <= 800 ) {
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

