
function initScrollTop () {
  $("#scroll-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });

  $(window).scroll(function () {
    if ($(document).scrollTop() > 1000) {
      $("#scroll-top").css("display", "block");
    } else {
      $("#scroll-top").css("display", "none");
    }
  });
}

function initLazyLoad () {
  $("img[data-src]").lazyload({
    data_attribute: "src"
  });
}

function initNavbar () {
  var $navbar = $("nav.navbar");

  AdjustHeader(); // Incase the user loads the page from halfway down (or something);
  $(window).scroll(function() {
      AdjustHeader();
  });

  function AdjustHeader(){
    if ($(window).scrollTop() > 5) {
      if ($navbar.hasClass("fixed-top")) {
        $navbar.removeClass("fixed-top");
      }
    } else {
      $navbar.addClass("fixed-top");
    }
  }
}

$(document).ready(function () {
  initLazyLoad();
  initScrollTop();
});

// avoid css transition on load
$(window).load(function() {
  $("body").removeClass("preload");
});
