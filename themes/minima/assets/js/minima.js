
function initScrollTop () {
  document.querySelector("#scroll-top")
    .addEventListener("click", function() {
      // console.log("scroll-up clicked");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });

  window.addEventListener("scroll", function() {
//    scrollObject = {
//       x: window.pageXOffset,
//       y: window.pageYOffset
//    }
//  console.log("window scrolled", scrollObject);

    if (window.pageYOffset > 800) {
      document.querySelector("#scroll-top").style = "display:block;";
//  console.log("window scrolled, set display block");
    }
    else {
      document.querySelector("#scroll-top").style = "display:none;";
//      console.log("window scrolled, set display none");
    }
  });
}

function modAnchorTarget () {
  document.querySelectorAll('a').forEach(function(item) {
    // console.log("modAnchortarget,", item);
    var pattern = new RegExp("/" + window.location.host + "/");
    if (!pattern.test(item.href)) {
      // console.log("modAnchortarget, outer link", item);
      item.target = "_blank";
    }
  });
}


// Handler when the DOM is fully loaded
var onReady = function() {
  initScrollTop();
  modAnchorTarget();
};

if (document.readyState === "complete"
    || (document.readyState !== "loading"
        && !document.documentElement.doScroll)) {
  onReady();
} else {
  document.addEventListener("DOMContentLoaded", onReady);
}


// avoid css transition on load
window.addEventListener("load", function() {
  document.querySelector("body").classList.remove("preload");
});
