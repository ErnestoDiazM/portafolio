const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        burger.classList.toggle('toggle');
    });
}

const projectFilter = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else if (card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                    
                    if (card.style.display === 'block') {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    }
                }, 300);
            });
        });
    });
    
    projectCards.forEach(card => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    });
}

const smoothScroll = () => {
    const navLinks = document.querySelectorAll('.nav-links a, .footer-links a, .cta-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            if (link.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 70,
                        behavior: 'smooth'
                    });
                    
                    const nav = document.querySelector('.nav-links');
                    if (nav.classList.contains('nav-active')) {
                        const burger = document.querySelector('.burger');
                        nav.classList.remove('nav-active');
                        burger.classList.remove('toggle');
                    }
                }
            }
        });
    });
}

const animateSkills = () => {
    const skillLevels = document.querySelectorAll('.skill-level');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const width = entry.target.style.width;
                entry.target.style.width = '0';
                
                setTimeout(() => {
                    entry.target.style.transition = 'width 1s ease-in-out';
                    entry.target.style.width = width;
                }, 200);
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillLevels.forEach(level => {
        observer.observe(level);
    });
}

const contactForm = () => {
    const form = document.getElementById('contactForm');
    
    
    emailjs.init("tG_Yi7KDpZr4KbVlP"); 
    
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            
            const formData = new FormData(form);
            const formValues = {};
            
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            
            emailjs.send(
                'service_qoqrjbn', 
                'template_tzml3bc', 
                {
                    name: formValues.name,
                    email: formValues.email,
                    subject: formValues.subject,
                    message: formValues.message
                }
            )
            .then(() => {
                console.log('Email enviado correctamente');
                form.reset();
                submitBtn.innerHTML = '<i class="fas fa-check"></i> ¡Enviado!';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            })
            .catch(error => {
                console.error('Error al enviar el email:', error);
                submitBtn.innerHTML = '<i class="fas fa-times"></i> Error al enviar';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            });
        });
    }
}

const stickyNav = () => {
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = 'none';
        }
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

const scrollAnimation = () => {
    const animatedElements = document.querySelectorAll('.project-card, .skill-category, .contact-content > div');
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease';
        
        element.style.transitionDelay = `${index * 0.1}s`;
        
        observer.observe(element);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    projectFilter();
    smoothScroll();
    animateSkills();
    contactForm();
    stickyNav();
    scrollAnimation();
    
    document.querySelector('.filter-btn').classList.add('active');
});
