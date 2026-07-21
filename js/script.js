```javascript id="2cbukx"
/* =========================================================
   MITS COLLEGE WEBSITE - JAVASCRIPT

   Used by:
   - index.html
   - about.html

   Features:
   1. Dynamic copyright year
   2. Mobile hamburger navigation
   3. Close mobile menu after clicking a link
   4. Close mobile menu when clicking outside
   5. Smooth scrolling
   6. Back-to-top button
   7. Scroll reveal animations
   8. Animated statistics counters
   9. Sticky header scroll effect
========================================================= */


document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. DYNAMIC COPYRIGHT YEAR
    ====================================================== */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    /* =====================================================
       2. MOBILE HAMBURGER NAVIGATION
    ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", function () {

            // Toggle menu visibility
            navMenu.classList.toggle("active");

            // Animate hamburger icon
            menuToggle.classList.toggle("active");

            // Prevent background scrolling when menu is open
            document.body.classList.toggle("menu-open");

            // Accessibility
            const isOpen = navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* =================================================
           3. CLOSE MOBILE MENU AFTER CLICKING A LINK
        ================================================== */

        const navLinks = navMenu.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                closeMobileMenu();

            });

        });


        /* =================================================
           4. CLOSE MENU WHEN CLICKING OUTSIDE
        ================================================== */

        document.addEventListener("click", function (event) {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedMenuButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedMenuButton &&
                navMenu.classList.contains("active")
            ) {

                closeMobileMenu();

            }

        });


        /* =================================================
           CLOSE MENU WITH ESCAPE KEY
        ================================================== */

        document.addEventListener("keydown", function (event) {

            if (
                event.key === "Escape" &&
                navMenu.classList.contains("active")
            ) {

                closeMobileMenu();

                menuToggle.focus();

            }

        });


        /* =================================================
           CLOSE MOBILE MENU FUNCTION
        ================================================== */

        function closeMobileMenu() {

            navMenu.classList.remove("active");

            menuToggle.classList.remove("active");

            document.body.classList.remove("menu-open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* =================================================
           RESET MENU WHEN SCREEN BECOMES DESKTOP SIZE
        ================================================== */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {

                closeMobileMenu();

            }

        });

    }


    /* =====================================================
       5. SMOOTH SCROLLING FOR INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            /*
                Ignore links that only contain "#"
                because they are placeholders.
            */

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const targetElement =
                document.querySelector(targetId);

            if (targetElement) {

                event.preventDefault();

                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================================
       6. BACK TO TOP BUTTON
    ====================================================== */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        /*
            Show the button after scrolling
            down the page.
        */

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        /*
            Scroll smoothly back to the top.
        */

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       7. SCROLL REVEAL ANIMATIONS
    ====================================================== */

    /*
        Select important sections/cards that should
        animate when they enter the viewport.
    */

    const revealElements =
        document.querySelectorAll(
            ".section-heading, " +
            ".about-content, " +
            ".about-image, " +
            ".stat-card, " +
            ".academic-card, " +
            ".department-item, " +
            ".feature-card, " +
            ".research-content, " +
            ".research-visual, " +
            ".placements-content, " +
            ".placements-visual, " +
            ".news-card, " +
            ".vision-card, " +
            ".mission-card, " +
            ".timeline-item, " +
            ".leadership-card, " +
            ".campus-card, " +
            ".development-content, " +
            ".development-image"
        );


    /*
        Add the reveal class using JavaScript.

        The CSS already contains:

        .reveal {
            opacity: 0;
            transform: translateY(30px);
        }

        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    */

    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });


    /*
        IntersectionObserver watches elements
        entering the viewport.
    */

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "active"
                            );

                            /*
                                Stop observing after
                                animation has happened.
                            */

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -40px 0px"
                }

            );


        revealElements.forEach(function (element) {

            revealObserver.observe(element);

        });

    } else {

        /*
            Fallback for older browsers.
        */

        revealElements.forEach(function (element) {

            element.classList.add("active");

        });

    }


    /* =====================================================
       8. ANIMATED STATISTICS COUNTERS
    ====================================================== */

    const counters =
        document.querySelectorAll(".counter");


    /*
        Animate a single counter.
    */

    function animateCounter(counter) {

        /*
            Get target value from:

            data-target="25"

            Example:
            <h3 class="counter"
                data-target="25">
                25+
            </h3>
        */

        const target =
            Number(counter.dataset.target);


        /*
            If data-target is missing or invalid,
            don't run animation.
        */

        if (!target || target <= 0) {
            return;
        }


        const duration = 1800;

        let startTime = null;


        function updateCounter(timestamp) {

            if (!startTime) {

                startTime = timestamp;

            }


            const progress =
                Math.min(
                    (timestamp - startTime) /
                    duration,
                    1
                );


            /*
                Ease-out animation.

                Makes counter fast at the beginning
                and slower near the target.
            */

            const easeOut =
                1 - Math.pow(
                    1 - progress,
                    3
                );


            const currentValue =
                Math.floor(
                    easeOut * target
                );


            counter.textContent =
                currentValue + "+";


            if (progress < 1) {

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target + "+";

            }

        }


        requestAnimationFrame(
            updateCounter
        );

    }


    /*
        Start counter animation only when
        statistics become visible.
    */

    if (
        counters.length > 0 &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(

                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },

                {
                    threshold: 0.5
                }

            );


        counters.forEach(function (counter) {

            counterObserver.observe(counter);

        });

    } else {

        /*
            Browser fallback.
        */

        counters.forEach(function (counter) {

            animateCounter(counter);

        });

    }


    /* =====================================================
       9. HEADER SCROLL EFFECT
    ====================================================== */

    const mainHeader =
        document.querySelector(".main-header");


    if (mainHeader) {

        function updateHeader() {

            if (window.scrollY > 50) {

                mainHeader.classList.add(
                    "header-scrolled"
                );

            } else {

                mainHeader.classList.remove(
                    "header-scrolled"
                );

            }

        }


        window.addEventListener(
            "scroll",
            updateHeader
        );


        /*
            Run once when page loads.
        */

        updateHeader();

    }


    /* =====================================================
       10. ACTIVE NAVIGATION BASED ON PAGE
    ====================================================== */

    const navigationLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );


    /*
        Get current HTML filename.

        Example:

        /index.html -> index.html
        /about.html -> about.html
    */

    let currentPage =
        window.location.pathname
            .split("/")
            .pop();


    /*
        If URL ends with "/",
        treat it as index.html.
    */

    if (!currentPage) {

        currentPage = "index.html";

    }


    navigationLinks.forEach(function (link) {

        const linkHref =
            link.getAttribute("href");


        /*
            Remove old active state only when
            checking page links.
        */

        if (
            linkHref === "index.html" ||
            linkHref === "about.html"
        ) {

            link.classList.remove("active");


            if (linkHref === currentPage) {

                link.classList.add("active");

            }

        }

    });


    /* =====================================================
       11. PREVENT EMPTY PLACEHOLDER LINKS FROM
           JUMPING TO TOP
    ====================================================== */

    const placeholderLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    placeholderLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    });


    /* =====================================================
       12. SIMPLE PAGE LOAD CLASS
    ====================================================== */

    /*
        Adds a class to the body after the
        HTML has fully loaded.

        Useful if you want additional CSS
        page-load animations later.
    */

    document.body.classList.add(
        "page-loaded"
    );

});


/* =========================================================
   13. FULL PAGE LOAD EVENT
========================================================= */

window.addEventListener("load", function () {

    /*
        Remove a loading class if you decide
        to create a loading screen later.

        Currently this safely does nothing
        unless the class exists.
    */

    document.body.classList.remove(
        "loading"
    );

});
```
