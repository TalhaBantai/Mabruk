 
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

    // Logo Animation (Home Page Only)
    if (document.querySelector('.home-logo')) {
        const logo = document.querySelector('.home-logo');
        logo.addEventListener('animationend', () => {
            logo.style.animation = 'none'; // Remove animation after it finishes
            logo.style.opacity = 1; // Ensure it's visible
            logo.style.transform = 'translateX(0)'; // Reset transform
        });
    }
});