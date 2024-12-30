document.addEventListener("DOMContentLoaded", () => {
    const elementToAnimate = document.querySelectorAll(".animate__animated");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                   const animationClass = entry.target.getAttribute("data-animation");
                   entry.target.classList.add(animationClass, "visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.5,
        }
    );
    elementToAnimate.forEach(element => observer.observe(element));
});