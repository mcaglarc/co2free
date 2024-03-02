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
});  
$(document).ready(function () {
    $(window).scroll(function () {
        var windowMid = $(window).height() / 2 + $(window).scrollTop();

        $('section').each(function () {
            var sectionTop = $(this).offset().top;
            var sectionBottom = sectionTop + $(this).outerHeight();
            var hash = $(this).attr('id');

            // Calculate distance from the middle of the viewport to the middle of the section  
            var distance = Math.abs(windowMid - (sectionTop + $(this).outerHeight() / 2));

            // Determine how "active" a section should be based on its distance to the viewport center  
            if (distance < 200) { // Threshold for "active" state; adjust as necessary  
                $('#nav-' + hash).addClass('nav-link-active');
            } else {
                $('#nav-' + hash).removeClass('nav-link-active');
            }
        });
    });
});  

$(document).ready(function () {
    // Preload and delay opening of the video modal  
    setTimeout(function () {
        // Trigger the modal to show  
        $('#videoModal').modal('show');

        // Get the video element  
        var introVideo = document.getElementById("introVideo");

        // Play the video when the modal is shown  
        $('#videoModal').on('shown.bs.modal', function (e) {
            introVideo.play();
        });

    }, 10000); // 10 second delay  

    // When the video has ended, close the modal  
    var introVideo = document.getElementById("introVideo");
    introVideo.onended = function () {
        $('#videoModal').modal('hide');
    };

    // When the modal is hidden, optionally reset the video to the beginning  
    $('#videoModal').on('hidden.bs.modal', function (e) {
        introVideo.pause();
        introVideo.currentTime = 0;
    });
});  




document.addEventListener("DOMContentLoaded", function () {
    var btnUp = document.createElement("button");
    var btnDown = document.createElement("button");
    btnUp.innerHTML = '<i class="bi bi-arrow-up"></i>';
    btnDown.innerHTML = '<i class="bi bi-arrow-down"></i>';
    btnUp.id = "btnUp";
    btnDown.id = "btnDown";
    btnUp.className = "nav-btn btn btn-primary";
    btnDown.className = "nav-btn btn btn-primary";

    // Initially hide the "Up" button as we're at the top on load  
    btnUp.style.display = "none";

    var placeholder = document.getElementById("dynamicNavButtons");
    placeholder.appendChild(btnUp);
    placeholder.appendChild(btnDown);

    function scrollToSection(direction) {
        var sections = document.querySelectorAll("section");
        var currentScrollPosition = window.pageYOffset + 1; // +1 to ensure we move to the next section if exactly at the start of a section    

        if (direction === "down") {
            for (let i = 0; i < sections.length; i++) {
                let sectionTop = sections[i].offsetTop;
                if (sectionTop > currentScrollPosition) {
                    sections[i].scrollIntoView({ behavior: "smooth" });
                    return; // Exit the function once the next section is found    
                }
            }
        } else if (direction === "up") {
            for (let i = sections.length - 1; i >= 0; i--) {
                let sectionTop = sections[i].offsetTop;
                if (sectionTop < currentScrollPosition - 1) { // -1 to ensure we move to the previous section if at the start of a section    
                    sections[Math.max(0, i)].scrollIntoView({ behavior: "smooth" });
                    return; // Exit the function once the previous section is found    
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

        // Hide "Up" button at top  
        if (scrollTop <= 0) {
            btnUp.style.display = "none";
        } else {
            btnUp.style.display = "block";
        }

        // Hide "Down" button at bottom  
        if (scrollTop + clientHeight >= scrollHeight) {
            btnDown.style.display = "none";
        } else {
            btnDown.style.display = "block";
        }
    }

    // Check scroll position on load and on scroll  
    checkScrollPosition();
    window.addEventListener("scroll", checkScrollPosition);
});  


