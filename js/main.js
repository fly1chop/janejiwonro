$(document).ready(function() {
  cursorTracking();
  setThemeSwitch();
  pageScroll();
  filterSelection();
});

function cursorTracking() {
  var $cursorDiv = $('.mouse-cursor-tracking');
  $(document).on('mousemove', function(e) {
    var delay = 10;
    var x = e.clientX - delay;
    var y = e.clientY - delay;
    $cursorDiv.css({'left': x + 'px', 'top' : y + 'px'});
  });
}

function filterSelection() {
  $('#portfolio ul.tags').each(function() {
    var dataArray = [];
    var children = $(this).children();

    children.each(function(i, v) {
      dataArray.push([($(v).data('menu'))])
    })

    $(this).closest('li').attr("data-menu", dataArray);
  });

  var $btns = $('#filters > button').click(function() {
    var $item = $('ul.list > li');
    var name = $(this).attr("name");
    if (name === 'all') {
      $item.css({'display': 'block'});
    } else {

    }
  })
}


function setThemeSwitch() {
  var toggle = $('div.theme > a');
  var storedTheme = localStorage.getItem('theme') || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  
  if (storedTheme)
    document.documentElement.setAttribute('data-theme', storedTheme)
  
  if (storedTheme === 'light') {
    toggle.addClass('light');
  } else {
    toggle.addClass('dark');
  }

  toggle.on('click', function(e) {
    e.preventDefault();
    var currentTheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = '';

    if (currentTheme === "light") {
      targetTheme = "dark";
      toggle.removeClass('light');
      toggle.addClass('dark');
    } else if (currentTheme === "dark") {
      targetTheme = "light";
      toggle.removeClass('dark');
      toggle.addClass('light');
    }

    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
  }) 
}

function pageScroll() {
  var numPage = $('section.page').length;
  var pageNow = 0;
  var pagePrev = 0;
  var pageNext = 0;
  var scrollEvent = ('onmousewheel' in window) ? 'mousewheel' : 'DOMMouseScroll';
  var isBlocked = false;

  checkCurrentPage();

  $(window).on('scroll resize', function() {
    checkCurrentPage();
  })

  $('#gnb > ul > li > a').on('click', function() {
    var index = $('#gnb > ul > li').index($(this).parent());
    showPage(index + 1);
  });

  $('a.down').on('click', function() {
    showPage(2);
  })

  window.addEventListener(scrollEvent, function(e) {
    e.preventDefault();
    if (isBlocked === true) return false;
    isBlocked = true;
    var delta = 0;
    if (scrollEvent === 'mousewheel') {
      delta = e.wheelDelta / -120;
    } else {
      delta = e.detail / 3;
    }
    if (delta > 0) {
      showPage(pageNext);
    } else if (delta < 0) {
      showPage(pagePrev);
    }
  }, {'passive': false});

  function showPage(n) {
    var scrollAmt = $('section.page:eq(' + (n - 1) + ')').offset().top;
    $('html').stop(true).animate({'scrollTop': scrollAmt}, 500, function() {
      isBlocked = false;
    });
    $('#gnb > ul > li').removeClass('on');
    $('#gnb > ul > li:eq(' + (n - 1) + ')').addClass('on');
    pageNow = n;
    pagePrev = (n <= 1) ? 1 : (n - 1);
    pageNext = (n >= numPage) ? numPage : (n + 1);
  }

  function checkCurrentPage() {
    var scrollAmt = $(document).scrollTop();
    $('section.page').each(function(i) {
      var min = $(this).offset().top - ($(window).height() / 2);
      var max = $(this).offset().top + ($(window).height() / 2);
      // console.log((i + 1) + 'page : ' + min + ' ~ ' + max + '||' + scrollAmt)
      if (scrollAmt > min && scrollAmt <= max) {
        var n = i + 1;
        $('#gnb > ul > li').removeClass('on');
        $('#gnb > ul > li:eq(' + (n - 1) + ')').addClass('on');
        $('section.page').removeClass('on');
        $('section.page:eq(' + (n - 1) +')').addClass('on');
        pageNow = n;
        pagePrev = (n <= 1) ? 1 : (n - 1);
        pageNext = (n >= numPage) ? numPage : (n + 1);
        return false;
      }
    });
  }
}