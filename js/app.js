document.addEventListener("DOMContentLoaded", () => {

    /* ===========================
       Smooth Scrolling
    =========================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ===========================
       Scroll Reveal Animation
    =========================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll("section, .shot, #why li").forEach(element => {

        element.classList.add("fade-up");

        observer.observe(element);

    });


    /* ===========================
       Active Navigation
    =========================== */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                currentSection = section.id;
            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (link.getAttribute("href") === "#" + currentSection) {
                link.classList.add("active");
            }

        });

    }


    /* ===========================
       Header Shadow
    =========================== */

    const header = document.querySelector("header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 20) {

            header.style.boxShadow = "0 8px 24px rgba(0,0,0,0.08)";

        } else {

            header.style.boxShadow = "none";

        }

    }


    /* ===========================
       Scroll Events
    =========================== */

    window.addEventListener("scroll", () => {

        updateActiveNav();
        updateHeader();

    });


    /* ===========================
       Initial Run
    =========================== */

    updateActiveNav();
    updateHeader();

});