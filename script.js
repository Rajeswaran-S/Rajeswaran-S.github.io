// Portfolio JavaScript 

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('menu-btn');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    menuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
        const icon = menuBtn.querySelector('i');
        if(navLinks.classList.contains('nav-active')){
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when an item is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if(navLinks.classList.contains('nav-active')){
                navLinks.classList.remove('nav-active');
                menuBtn.querySelector('i').classList.remove('fa-times');
                menuBtn.querySelector('i').classList.add('fa-bars');
            }
        });
    });

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once animating in
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger reveal for elements in view on load
    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);


    // --- Active Navigation Link on Scroll ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // --- Dynamic Typing Effect ---
    const textEl = document.getElementById('typing-text');
    const words = ['Artificial Intelligence', 'Data Science', 'Machine Learning'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            textEl.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            textEl.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 150; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    if(textEl) {
        setTimeout(type, 1000);
    }
});
