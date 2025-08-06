// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar-wrapper');
const sections = document.querySelectorAll('section');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    });
});

// Add scroll event for navbar transformation
window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Highlight active section in navbar
window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const scrollPosition = window.pageYOffset + navbar.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        if (this.getAttribute('href') !== '#') {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Add reveal animation to sections
const revealSections = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        if (sectionTop < windowHeight - revealPoint) {
            section.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealSections);
// Initial call to reveal sections that might be in view on load
revealSections();


// this is forhero number counting loop 

const counter1 = document.getElementById('counter1');
const counter2 = document.getElementById('counter2');
const counter3 = document.getElementById('counter3');
const counter4 = document.getElementById('counter4');

let started = false;

function countUp(target, max, duration) {
    let start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * max);

        if (value !== start) {
            start = value;
            target.textContent = value.toLocaleString();
        }

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            target.textContent = max.toLocaleString(); // Ensure exact max at the end
        }
    }

    requestAnimationFrame(update);
}


function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function onScroll() {
    if (!started && isInViewport(counter1)) {
        started = true;
        countUp(counter1, 1000, 2500); // 0 to 1000 in 2 sec
        countUp(counter2, 15, 700);   // 1 to 15 in 1.5 sec
        countUp(counter3, 200, 2000);  // 0 to 200 in 1.8 sec
        countUp(counter4, 100, 1700);  // 0 to 100 in 1.2 sec
        window.removeEventListener('scroll', onScroll);
    }
}

window.addEventListener('scroll', onScroll);

// this is forhero number counting loop //