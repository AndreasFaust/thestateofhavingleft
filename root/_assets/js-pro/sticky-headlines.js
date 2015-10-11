function sticky(settings) {
  'use strict';

  var element = settings.element;

  var aktiv = false;

  var windowHeight;
  var offsetTop;
  var elementHeight;
  var difference;

  var tCheckOffset;
  var dUpdate;

  init();

  function init() { 
    update();
    tCheckOffset = _.throttle(checkOffset, 100);
    dUpdate = _.debounce(update, 250);
    window.addEventListener('scroll', tCheckOffset);
    window.addEventListener('resize', update);
  }

  function destroy() {
    window.removeEventListener('scroll', tCheckOffset);
    window.removeEventListener('resize', update);
  }

  function update () {
    updateValues(checkOffset);
  }

  function updateValues(callback) {
    windowHeight = window.innerHeight;
    offsetTop = element.getBoundingClientRect().top;
    elementHeight = element.clientHeight;
    difference = windowHeight - elementHeight;
    callback();
  }

  function checkOffset() {
    var offsetTop = element.getBoundingClientRect().top;
    if( offsetTop <= windowHeight && offsetTop >= difference ) {
      if ( aktiv===true ) { return; }
      if(settings.enterCallback) { settings.enterCallback(); }
      aktiv=true;
    } else {
      if ( aktiv===false ) { return; }
      if (settings.leaveCallback) { settings.leaveCallback(); }
      aktiv=false;
    }
  }

  return {
    init: init,
    destroy: destroy,
    update: update
  };

}

// Images

(function(window, document, undefined) {
  'use strict';


  var arbeiten = document.getElementsByClassName('arbeit');
  var al = arbeiten.length;
  var waypointsAll = [];

  window.addEventListener('load', init);

  function init() {
    forEach(arbeiten, function(i,arbeit) {

      arbeit.style.zIndex = (al-i)*10;

      var caption = arbeit.getElementsByTagName('h1')[0];

      if(caption) {
        waypointsAll[i] = sticky({
          element: arbeit,
          offset: 0,
          enterCallback: function() { enterWaypoint(caption); },
          leaveCallback: function() { leaveWaypoint(caption); }
        });
      }

    });  
  }

  function enterWaypoint(ele) {
    // console.log('Entered');
    ele.classList.add('sticky');  
  }

  function leaveWaypoint(ele) {
    // console.log('Left');
    ele.classList.remove('sticky');  
  }


})(window, document);
