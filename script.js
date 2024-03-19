document.addEventListener('DOMContentLoaded', function () {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function (navLink) {
        navLink.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetOffset = targetSection.offsetTop - headerHeight;

            window.scrollTo({
                top: targetOffset,
                behavior: 'smooth'
            });
        });
    });
});