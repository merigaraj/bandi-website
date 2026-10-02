// rydap.in — small site script: mobile menu, header shadow, reveal on scroll, table-of-contents highlight
(function () {
  var header = document.querySelector(".site-header");
  var btn = document.querySelector(".menu-btn");
  var links = document.querySelector(".nav-links");

  if (btn && links) {
    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  function onScroll() {
    if (header) header.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  // documents: highlight the section being read in the table of contents
  var toc = document.querySelectorAll(".toc a[href^='#']");
  if (toc.length && "IntersectionObserver" in window) {
    var map = {};
    toc.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var tio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && map[e.target.id]) {
          toc.forEach(function (a) { a.classList.remove("on"); });
          map[e.target.id].classList.add("on");
        }
      });
    }, { rootMargin: "-80px 0px -70% 0px" });
    document.querySelectorAll(".doc h2[id]").forEach(function (h) { tio.observe(h); });
  }

  // year in the footer
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

// Contact form → opens the visitor's email app with the message filled in (no server needed)
function sendSupportEmail(e) {
  if (e) e.preventDefault();
  var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
  var name = v("supportName"), phone = v("supportPhone"), email = v("supportEmail"),
      topic = v("supportTopic"), msg = v("supportMessage");
  if (!name || !msg) {
    alert("Please enter your name and message.");
    return false;
  }
  if (phone && !/^[6-9]\d{9}$/.test(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    return false;
  }
  var subject = "rydap support: " + (topic || "General") + " — " + name;
  var body = "Name: " + name + "\nRegistered mobile: " + (phone || "-") + "\nEmail: " + (email || "-") +
             "\nTopic: " + (topic || "General") + "\n\n" + msg;
  window.location.href = "mailto:support@rydap.in?subject=" + encodeURIComponent(subject) +
                         "&body=" + encodeURIComponent(body);
  return false;
}
