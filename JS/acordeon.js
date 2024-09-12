document.addEventListener("DOMContentLoaded", function () {
  var accordions = document.querySelectorAll(".accordion-btn");

  accordions.forEach(function (accordion) {
    accordion.addEventListener("click", function () {
      var content = this.nextElementSibling;

      // Verificăm dacă tab-ul este deja deschis
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.classList.remove("active");
        this.querySelector(".icon").textContent = "+";
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        this.classList.add("active");
        this.querySelector(".icon").textContent = "-";
      }
    });
  });
});
