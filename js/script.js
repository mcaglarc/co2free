document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for anchor links  
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Dynamic navbar on scroll  
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.classList.add('navbar-scroll');
        } else {
            navbar.classList.remove('navbar-scroll');
        }
    });

    // Dynamic active navigation link highlighting based on section in view  
    $(window).scroll(function () {
        var windowMid = $(window).height() / 2 + $(window).scrollTop();

        $('section').each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var hash = $(this).attr('id');

            var distance = Math.abs(windowMid - (sectionTop + $(this).outerHeight() / 2));

            if (distance < 200) {
                $('#nav-' + hash).addClass('nav-link-active');
            } else {
                $('#nav-' + hash).removeClass('nav-link-active');
            }
        });
    });

    // Delayed video loading and modal display  
    setTimeout(function () {
        // Dynamically set the source to start loading the video  
        var introVideo = document.getElementById("introVideo");
        introVideo.src = "images/video.mp4"; // Ensure this path is correct  

        // Delay showing the modal by an additional 10 seconds (20 seconds total from page load)  
        setTimeout(function () {
            $('#videoModal').modal('show');
        }, 10000); // Delay for showing the modal  

        // Play the video when the modal is shown  
        $('#videoModal').on('shown.bs.modal', function (e) {
            introVideo.play();
        });

        // When the video has ended, close the modal  
        introVideo.onended = function () {
            $('#videoModal').modal('hide');
        };

        // Reset the video to the beginning when the modal is hidden  
        $('#videoModal').on('hidden.bs.modal', function (e) {
            introVideo.pause();
            introVideo.currentTime = 0;
        });
    }, 10000); // Initial delay for starting to load the video  

    // Dynamic Up and Down Navigation Buttons  
    var btnUp = document.createElement("button");
    var btnDown = document.createElement("button");

    btnUp.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btnDown.innerHTML = '<i class="bi bi-arrow-down"></i>';

    btnUp.id = "btnUp";
    btnDown.id = "btnDown";

    btnUp.className = "nav-btn btn btn-primary";
    btnDown.className = "nav-btn btn btn-primary";

    // Adding aria-label for accessibility  
    btnUp.setAttribute("aria-label", "Scroll Up");
    btnDown.setAttribute("aria-label", "Scroll Down");

    btnUp.style.display = "none"; // Hide "Up" button initially  

    var placeholder = document.getElementById("dynamicNavButtons");
    placeholder.appendChild(btnUp);
    placeholder.appendChild(btnDown);  


    function scrollToSection(direction) {
        var sections = document.querySelectorAll("section");
        var currentScrollPosition = window.pageYOffset + 1;

        if (direction === "down") {
            for (let i = 0; i < sections.length; i++) {
                let sectionTop = sections[i].offsetTop;
                if (sectionTop > currentScrollPosition) {
                    sections[i].scrollIntoView({ behavior: "smooth" });
                    return;
                }
            }
        } else if (direction === "up") {
            for (let i = sections.length - 1; i >= 0; i--) {
                let sectionTop = sections[i].offsetTop;
                if (sectionTop < currentScrollPosition - 1) {
                    sections[Math.max(0, i)].scrollIntoView({ behavior: "smooth" });
                    return;
                }
            }
        }
    }

    btnUp.addEventListener("click", function () {
        scrollToSection("up");
    });
    btnDown.addEventListener("click", function () {
        scrollToSection("down");
    });

    function checkScrollPosition() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var scrollHeight = document.documentElement.scrollHeight;
        var clientHeight = document.documentElement.clientHeight;

        if (scrollTop <= 0) {
            btnUp.style.display = "none";
        } else {
            btnUp.style.display = "block";
        }

        if (scrollTop + clientHeight >= scrollHeight) {
            btnDown.style.display = "none";
        } else {
            btnDown.style.display = "block";
        }
    }

    checkScrollPosition();
    window.addEventListener("scroll", checkScrollPosition);
});  
