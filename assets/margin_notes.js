function make_interactive(anchor, moving=false) {
  if (anchor.nodeName == 'P') {
    anchor = anchor.parentElement;
  }
  expand_string = '<p class="expand">Click to expand</p>'
  var w = window,
      d = document,
      e = d.documentElement,
      g = d.getElementsByTagName('body')[0],
      x = w.innerWidth || e.clientWidth || g.clientWidth,
      y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  // if (x >= 1080) {
  //   anchor.style.height = 'auto';
  //   if (anchor.innerHTML.substring(0, expand_string.length) == expand_string) {
  //     anchor.innerHTML = anchor.innerHTML.substring(expand_string.length)
  //   }
  //   return 0
  // } else 
  if (moving) {
    if (anchor.style.height == 'auto') {
      anchor.innerHTML = expand_string + anchor.innerHTML
      anchor.style.height = '25px';
      return 0;
    }
    if (anchor.innerHTML.substring(0, expand_string.length) != expand_string) {
      anchor.style.height = 'initial';
    } else {
      anchor.style.height = '25px';
    }
    return 0;
  }
  
  if (anchor.innerHTML.substring(0, expand_string.length) != expand_string) {
    anchor.innerHTML = expand_string + anchor.innerHTML
    anchor.style.height = '25px';
  } else {
    anchor.innerHTML = anchor.innerHTML.substring(expand_string.length)
    anchor.style.height = 'initial';
  }
}
window.onload = function() {
      var anchors = document.getElementsByClassName('note');
      for(var i = 0; i < anchors.length; i++) {
          var anchor = anchors[i];
          anchor.addEventListener('click', function(event){
              make_interactive(event.target);
          })
          make_interactive(anchor);
      }
  }
  window.onresize = function() {
    var anchors = document.getElementsByClassName('note');
      for(var i = 0; i < anchors.length; i++) {
          var anchor = anchors[i];
          make_interactive(anchor, true)
      }
  }