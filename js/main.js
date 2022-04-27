$(document).ready(function() {
  setActive();
});

$(window).on('scroll', function() {
  setActive();
});

function setActive() {
  var scrollAmt = $(document).scrollTop();
  var windowHeight = $(window).height()
  // var elTop = windowHeight - ($(window).height() * 0.5);

  // console.log('scrollAmt: ' + scrollAmt + ' || elTop: ' + elTop);

  // if (scrollAmt >= windowHeight - (windowHeight * 0.5)) {
  //   $('#about').addClass('on');
  // } else if (scrollAmt >= windowHeight) {
  //   $('#gnb').addClass('light');
  // } else if (scrollAmt >= windowHeight * 2) {
  //   $('#about').removeClass('on');
  //   $('#gnb').removeClass('light');
  // }

  if (scrollAmt >= windowHeight - (windowHeight * 0.5)) {
    $('#about').addClass('on');
  } else {
    $('#about').removeClass('on');
  }

}