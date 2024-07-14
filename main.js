document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll("nav a");

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Calculate the offset of the target element from the top of the page
        const offsetTop =
          targetElement.getBoundingClientRect().top + window.scrollY;

        // Smooth scroll animation using requestAnimationFrame
        const scrollAnimation = (startTime, currentTime) => {
          const duration = 0.3; // Adjust the duration as needed (in milliseconds)
          const progress = Math.min((currentTime - startTime) / duration, 1);
          window.scrollTo(0, easeInOutQuad(progress) * (offsetTop - 60)); // Adjust the offset as needed

          if (progress < 1) {
            requestAnimationFrame((newTime) =>
              scrollAnimation(startTime, newTime)
            );
          }
        };

        // Start the animation
        requestAnimationFrame((time) => scrollAnimation(time, time));
      }
    });
  });

  // Easing function for smooth animation
  function easeInOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
});
