
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

$(document).ready(function () {

  $("img[data-src]").lazyload({
    data_attribute: "src"
  });

  initScrollTop();
});
