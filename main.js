
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav a");

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const href = link.getAttribute("href");
      document.querySelector("main").style.animation = "fadeOut 0.4s forwards";
      setTimeout(() => {
        window.location.href = href;
      }, 400);
    });
  });
});
