

// On Load


(function(window, document, undefined) {
  'use strict';

  window.addEventListener('load', function load(event){
    document.body.classList.add('pageload');
  }, false);


})(window, document);


// Fixed Footer

(function(window, document, undefined) {
  'use strict';


  var wrapper = document.getElementById('wrapper');
  var footer = document.getElementById('footer');

  var dHeight = _.debounce(height, 150);

  height();
  window.addEventListener('resize', dHeight);

  function height() {
    var ih = window.innerHeight;
    footer.style.minHeight = ih + 'px';
  	wrapper.style.marginBottom = ih + 'px';
  }

})(window, document);




// textbox

(function(window, document, undefined) {
  'use strict';

  var textbox = document.getElementById('textbox');
  var togglebutton = textbox.getElementsByClassName('toggle')[0];
  var draggieText;
  var active = false;

  var scrollbar = new IScroll('#textbox-inner', {
    mouseWheel: true,
    scrollbars: 'custom',
    interactiveScrollbars: true
  });

  resize();
  var dResize = _.debounce(resize, 250);
  window.addEventListener('resize', dResize);

  function resize() {
    var ww = window.innerWidth;
    if (ww <= 1024) {
      if(active === false) { return; }
      active = false;
      removeDragToggle();
    } else {
      if(active === true) { return; }      
      active = true;
      addDragToggle();
    }

  }

  function addDragToggle() {
    draggieText = new Draggabilly( textbox, {
      handle: '.dragzone'
    });
    togglebutton.addEventListener('click', clickHandler);
  }

  function removeDragToggle() {
    draggieText.destroy();
    togglebutton.removeEventListener('click', clickHandler);
  }

  function clickHandler() {
    if(!textbox.classList.contains('hidden')) {
      textbox.classList.add('hidden');
    } else {
      textbox.classList.remove('hidden');
    }
  }


})(window, document);







