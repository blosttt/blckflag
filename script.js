/**
 * BLACK FLAG MMA - Interactive Scripts
 * Vanilla JS for Premium UI Animations & Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. NAVBAR DYNAMICS & SCROLL BEHAVIOR
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 2. ACTIVE NAVIGATION LINKS HIGHLIGHT (Intersection Observer)
    // ==========================================
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -40% 0px', // Trigger when section is in mid-viewport
        threshold: 0
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.getAttribute('id');
                
                // Update Desktop Links
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });

                // Update Mobile Links
                mobileLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${activeId}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // ==========================================
    // 3. MOBILE MENU TOGGLE
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileMenuLinks = document.querySelectorAll('.mobile-link');

    function toggleMobileMenu() {
        mobileToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        // Prevent body scroll when menu is active
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : 'auto';
    }

    mobileToggle.addEventListener('click', toggleMobileMenu);

    // Close menu when clicking a link
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileNav.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ==========================================
    // 4. MODALS LOGIC (LOGIN & REGISTER)
    // ==========================================
    const loginModal = document.getElementById('login-modal');
    const registerModal = document.getElementById('register-modal');
    
    // Triggers
    const btnLoginNav = document.getElementById('btn-login-trigger');
    const btnRegisterNav = document.getElementById('btn-register-trigger');
    const btnLoginMobile = document.getElementById('btn-login-trigger-mobile');
    const btnRegisterMobile = document.getElementById('btn-register-trigger-mobile');
    
    // Switch links inside modals
    const modalToRegister = document.getElementById('modal-to-register');
    const modalToLogin = document.getElementById('modal-to-login');
    
    // Close Buttons
    const closeButtons = document.querySelectorAll('.modal-close');

    // Open Login Modal
    function openLogin() {
        // Close other modal if open
        closeAllModals();
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Open Register Modal
    function openRegister() {
        closeAllModals();
        registerModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close all Modals
    function closeAllModals() {
        loginModal.classList.remove('active');
        registerModal.classList.remove('active');
        // Restore body scroll unless mobile navigation menu is active
        if (!mobileNav.classList.contains('active')) {
            document.body.style.overflow = 'auto';
        }
    }

    // Listeners for triggers
    if(btnLoginNav) btnLoginNav.addEventListener('click', openLogin);
    if(btnLoginMobile) btnLoginMobile.addEventListener('click', () => { toggleMobileMenu(); openLogin(); });
    if(btnRegisterNav) btnRegisterNav.addEventListener('click', openRegister);
    if(btnRegisterMobile) btnRegisterMobile.addEventListener('click', () => { toggleMobileMenu(); openRegister(); });

    // Listeners for toggle links within modals
    if(modalToRegister) modalToRegister.addEventListener('click', (e) => { e.preventDefault(); openRegister(); });
    if(modalToLogin) modalToLogin.addEventListener('click', (e) => { e.preventDefault(); openLogin(); });

    // Listeners for close buttons
    closeButtons.forEach(btn => btn.addEventListener('click', closeAllModals));

    // Close on click outside modal card
    window.addEventListener('click', (e) => {
        if (e.target === loginModal || e.target === registerModal) {
            closeAllModals();
        }
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeAllModals();
        }
    });

    // Form Submissions in modals (simulated)
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = loginForm.querySelector('.modal-submit');
            submitBtn.textContent = 'Verificando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Inicio de sesión exitoso (Simulado)!');
                loginForm.reset();
                submitBtn.textContent = 'Ingresar';
                submitBtn.disabled = false;
                closeAllModals();
            }, 1200);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = registerForm.querySelector('.modal-submit');
            submitBtn.textContent = 'Registrando...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Registro de cuenta exitoso (Simulado)! Bienvenido a Team Black Flag MMA.');
                registerForm.reset();
                submitBtn.textContent = 'Crear Cuenta';
                submitBtn.disabled = false;
                closeAllModals();
            }, 1500);
        });
    }

    // ==========================================
    // 5. CONTACT FORM AJAX SIMULATION
    // ==========================================
    const contactForm = document.getElementById('gym-contact-form');
    const formStatus = document.getElementById('form-status-alert');
    const submitBtn = contactForm.querySelector('.form-submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Hide previous alerts
            formStatus.className = 'form-alert';
            formStatus.style.display = 'none';
            
            // Enable button loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            // Form data retrieval
            const formData = {
                nombre: document.getElementById('nombre').value,
                email: document.getElementById('email').value,
                mensaje: document.getElementById('mensaje').value,
                newsletter: document.getElementById('newsletter').checked
            };

            // Simulate server request delay
            setTimeout(() => {
                // Success simulation
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
                
                let successMessage = `¡Gracias ${formData.nombre}! Tu mensaje ha sido enviado. Nos comunicaremos contigo a ${formData.email} a la brevedad.`;
                if (formData.newsletter) {
                    successMessage += " Te has suscrito exitosamente a nuestro newsletter.";
                }
                formStatus.textContent = successMessage;
                formStatus.classList.add('success');
                
                // Clear input fields
                contactForm.reset();
                
                // Auto-fade success message after 6 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-alert';
                }, 6000);

            }, 1800);
        });
    }

    // ==========================================
    // 6. SCROLL ANIMATION EFFECT ON VALUE CARDS
    // ==========================================
    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    
    const cardObserverOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.15
    };

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    cards.forEach(card => {
        // Initial setup for animation
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, background-color var(--transition-normal), border-color var(--transition-normal), box-shadow var(--transition-normal)';
        cardObserver.observe(card);
    });
});
