let div = document.querySelector('#logo');
$(document).ready(function() {

  /* Every time the window is scrolled ... */
  $(window).scroll( function(){


    /* If the object is completely visible in the window, fade it in */
    if($(window).scrollTop() > ($(window).height())/2 && jQuery('#logo').hasClass('slideright')) {
      let div = document.querySelector('#logo');
      div.classList.remove('slideright');
      div.classList.add('slideleft');
      console.log('2');
    }
    else if($(window).scrollTop() > ($(window).height())/2) {
      let div = document.querySelector('#logo');
      div.classList.add('slideleft');
      div.classList.remove('logovis');
      console.log('1');
    }
    else if ($(window).scrollTop() < ($(window).height())/2 && jQuery('#logo').hasClass('slideleft')) {
      let div = document.querySelector('#logo');
      div.classList.remove('slideleft');
      div.classList.add('slideright');
      console.log('3');
    }


  });

});
