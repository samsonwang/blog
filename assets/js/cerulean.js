
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
  let isScrolled = false;
  let lastPos = 0;
  let nav = document.querySelectorAll("#top-nav")[0];
  let navHeight = nav.offsetHeight;
  document.addEventListener("scroll", function() { isScrolled = true }, false);
  setInterval(function() {
    isScrolled && (!function() {
      let currPos = void 0 !== window.pageYOffset ?
          window.pageYOffset :
          (document.documentElement || document.body.parentNode || document.body).scrollTop;

      if (Math.abs(lastPos - currPos) <= 5) {
        return;
      }

      let maxHeight = Math.max(document.documentElement.clientHeight,
                               document.body.scrollHeight,
                               document.documentElement.scrollHeight,
                               document.body.offsetHeight,
                               document.documentElement.offsetHeight);

      if (lastPos < currPos && navHeight < currPos) {
        nav.classList.add("scroll-up");
      }
      else if (currPos + window.innerHeight < maxHeight) {
        nav.classList.remove("scroll-up");
      }
      lastPos = currPos;
    }(), isScrolled = false)
  }, 100);
}

$(document).ready(function () {
  initNavbar();
  initLazyLoad();
  initScrollTop();
});

// avoid css transition on load
$(window).on("load", function() {
  $("body").removeClass("preload");
});
