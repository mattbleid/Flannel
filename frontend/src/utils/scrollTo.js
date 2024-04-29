// utils/scrollTo.js
export const scrollTo = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const headerOffset = 60; // Height of your header if it's fixed at the top
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
};
