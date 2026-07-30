document.getElementById("currentYear").textContent = new Date().getFullYear();

const navbar = document.getElementById("mainNavbar");

document.querySelectorAll("#mainNavbar .nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    if (navbar.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(navbar).hide();
    }
  });
});
