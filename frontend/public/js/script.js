document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll("nav ul li a");

  navLinks.forEach(function (navLink) {
    navLink.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      const headerHeight = document.querySelector("header").offsetHeight;
      const targetOffset = targetSection.offsetTop - headerHeight;

      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    });
  });
  // Sticky Navigation Bar
  const navBar = document.querySelector("nav");
  const navBarOffsetTop = navBar.offsetTop;

  function handleScroll() {
    if (window.scrollY >= navBarOffsetTop) {
      navBar.classList.add("sticky");
    } else {
      navBar.classList.remove("sticky");
    }
  }

  window.addEventListener("scroll", handleScroll);

  ScrollReveal().reveal(".section", {
    delay: 200,
    distance: "50px",
    easing: "ease-in-out",
  });
});
