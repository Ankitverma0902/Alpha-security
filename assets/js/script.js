document.addEventListener('DOMContentLoaded', () => {
    // --- Particles.js Configuration ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00bfff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": true },
                "size": { "value": 3, "random": true },
                "line_linked": { "enable": true, "distance": 150, "color": "#00bfff", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out", "bounce": false }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "repulse": { "distance": 150, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                }
            },
            "retina_detect": true
        });
    }

    // --- Mobile Menu Toggle ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Header background on scroll ---
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('glass-effect');
            } else {
                header.classList.remove('glass-effect');
            }
        });
    }

    // --- Typing Effect ---
    const typingElement = document.getElementById('typing-effect');
    if (typingElement) {
        const words = ["Fortress.", "Assets.", "Future."];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            if (isDeleting) {
                typingElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
            const typeSpeed = isDeleting ? 100 : 200;
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- Fade-in on scroll animation ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };
    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    faders.forEach(fader => appearOnScroll.observe(fader));

    // --- Testimonial Slider ---
    const slider = document.getElementById('testimonial-slider');
    const prevBtn = document.getElementById('prev-testimonial');
    const nextBtn = document.getElementById('next-testimonial');
    if (slider && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            const slideWidth = slider.querySelector('.testimonial-card').clientWidth + 32;
            slider.scrollBy({ left: slideWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const slideWidth = slider.querySelector('.testimonial-card').clientWidth + 32;
            slider.scrollBy({ left: -slideWidth, behavior: 'smooth' });
        });
    }

   // --- Contact Form Submission (Supabase) ---
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

if (contactForm) {
    const disposableEmailDomains = [
        '10minutemail.com', 'temp-mail.org', 'guerrillamail.com', 'mailinator.com', 'throwawaymail.com',
        'getairmail.com', 'yopmail.com', 'maildrop.cc', 'tempmail.com', 'dispostable.com', 'trashmail.com'
    ];

    const sanitizeInput = (str) => {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#x27;',
            "/": '&#x2F;',
        };
        const reg = /[&<>"'/]/ig;
        return str.replace(reg, (match) => (map[match]));
    };

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const nameInput = contactForm.querySelector('input[name="name"]');
        const emailInput = contactForm.querySelector('input[name="email"]');
        const serviceInput = contactForm.querySelector('select[name="service"]');
        const messageInput = contactForm.querySelector('textarea[name="message"]');
        const submitButton = contactForm.querySelector('button[type="submit"]');

        if (!nameInput || !emailInput || !serviceInput || !messageInput || !submitButton) {
            console.error("One or more form fields could not be found.");
            formMessage.textContent = 'A form error occurred. Please refresh and try again.';
            formMessage.className = 'text-red-400';
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const service = serviceInput.value.trim();
        const message = messageInput.value.trim();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            formMessage.textContent = 'Please enter a valid email address.';
            formMessage.className = 'text-red-400';
            return;
        }

        const domain = email.split('@')[1].toLowerCase();
        if (disposableEmailDomains.includes(domain)) {
            formMessage.textContent = 'Disposable email addresses are not permitted.';
            formMessage.className = 'text-red-400';
            return;
        }

        if (name.length > 100 || name.length < 2) {
            formMessage.textContent = 'Name must be between 2 and 100 characters.';
            formMessage.className = 'text-red-400';
            return;
        }
        if (message.length > 5000 || message.length < 10) {
            formMessage.textContent = 'Message must be between 10 and 5000 characters.';
            formMessage.className = 'text-red-400';
            return;
        }

        const sanitizedName = sanitizeInput(name);
        const sanitizedService = sanitizeInput(service);
        const sanitizedMessage = sanitizeInput(message);

        // Disable submit button
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            // Initialize Supabase client (using values from contact.html)
            const supabaseUrl = document.querySelector('meta[name="supabase-url"]').content;
            const supabaseKey = document.querySelector('meta[name="supabase-key"]').content;
            const { createClient } = window.supabase;
            const supabaseClient = createClient(supabaseUrl, supabaseKey);

            // Insert into "contacts" (replace with your actual table name)
            const { error } = await supabaseClient
                .from('contacts')
                .insert([
                    {
                        name: sanitizedName,
                        email: email,
                        service: sanitizedService,
                        message: sanitizedMessage,
                    }
                ]);

            if (error) {
                console.error(error);
                formMessage.textContent = 'Error submitting form. Please try again later.';
                formMessage.className = 'text-red-400';
            } else {
                formMessage.textContent = 'Thank you! Your message has been sent.';
                formMessage.className = 'text-green-400';
                contactForm.reset();

                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        } catch (err) {
            console.error('Supabase Error:', err);
            formMessage.textContent = 'A network error occurred. Please try again later.';
            formMessage.className = 'text-red-400';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}
});
