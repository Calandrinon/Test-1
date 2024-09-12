function hasClass(ele, cls) {
  return !!ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
}

function addClass(ele, cls) {
  if (!hasClass(ele, cls)) ele.className += " " + cls;
}

function removeClass(ele, cls) {
  if (hasClass(ele, cls)) {
    var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
    ele.className = ele.className.replace(reg, " ");
  }
}

function toggleMenu() {
  var ele = document.getElementsByTagName("body")[0];
  var toggleButtonText = document.querySelector("#menu-toggle .menu-text");

  if (!hasClass(ele, "open")) {
    addClass(ele, "open");
    toggleButtonText.textContent = "INCHIDE";
  } else {
    removeClass(ele, "open");
    toggleButtonText.textContent = "MENU";
  }
}

function handleClickOutside(event) {
  var menu = document.getElementById("menu");
  var menuToggle = document.getElementById("menu-toggle");
  var body = document.getElementsByTagName("body")[0];

  // Verifică dacă clicul a fost în afara meniului și a butonului de toggle
  if (
    !menu.contains(event.target) &&
    !menuToggle.contains(event.target) &&
    hasClass(body, "open")
  ) {
    removeClass(body, "open");
    document.querySelector("#menu-toggle .menu-text").textContent = "MENU";
  }
}

document.addEventListener("readystatechange", function () {
  if (document.readyState === "complete") {
    var menuToggle = document.getElementById("menu-toggle");
    menuToggle.addEventListener("click", toggleMenu);
    document.addEventListener("click", handleClickOutside);
  }
});
