document.addEventListener("DOMContentLoaded", function() {
    const toc = document.querySelector(".toc .inner");
    if (!toc) {
        return;
    }

    const headings = document.querySelectorAll(".post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6");
    if (headings.length === 0) {
        return;
    }

    const tocLinks = toc.querySelectorAll("a");

    const onScroll = () => {
        let current = "";
        headings.forEach((heading) => {
            const headingTop = heading.offsetTop;
            if (pageYOffset >= headingTop - 80) { // 80px offset for header
                current = heading.getAttribute("id");
            }
        });

        tocLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // Run on page load
});
