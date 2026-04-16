document.addEventListener('DOMContentLoaded', () => {

    /* --- Menu Mobile Toggle --- */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if(mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });


    /* --- Scroll Animations com Intersection Observer --- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    // Seleciona todos os elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.fade-up, .fade-left, .fade-right');
    animatedElements.forEach(el => observer.observe(el));


    /* --- Integração de Formulário Real com FormSubmit --- */
    const contactForm = document.getElementById('contactForm');
    const formMsg = document.getElementById('form-msg');

    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            formMsg.style.display = 'block';
            formMsg.style.color = 'var(--clr-primary)';
            formMsg.innerText = 'Enviando...';

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const tel = document.getElementById('tel').value;
            const message = document.getElementById('message').value;

            fetch("https://formsubmit.co/ajax/italo.bomfin12@outlook.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: `Novo Contato no Portfolio de: ${name}`,
                    Nome: name,
                    Email: email,
                    Telefone: tel,
                    Mensagem: message
                })
            }).catch(error => console.error("Erro no envio:", error));

            // Feedback visual idêntico ao antigo (Mesmo que o e-mail seja processado no fundo)
            setTimeout(() => {
                formMsg.innerText = 'Mensagem enviada com sucesso! Entrarei em contato em breve.';
                contactForm.reset();
                
                setTimeout(() => {
                    formMsg.style.display = 'none';
                }, 4000);
            }, 1500);
        });
    }


    /* --- Inicialização do Particles.js --- */
    // Configuração baseada na original do Elementor enviada no HTML
    if(document.getElementById('particles-js')) {
        particlesJS("particles-js", {
            "particles": {
                "number": {
                    "value": 90,
                    "density": { "enable": true, "value_area": 800 }
                },
                "color": { "value": "#171717" },
                "shape": {
                    "type": "circle",
                    "stroke": { "width": 0, "color": "#000000" },
                    "polygon": { "nb_sides": 5 }
                },
                "opacity": {
                    "value": 0.5,
                    "random": false,
                    "anim": { "enable": false, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": { "enable": false, "speed": 40, "size_min": 0.1, "sync": false }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#171717",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 6,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
                }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "repulse" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 400, "line_linked": { "opacity": 1 } },
                    "bubble": { "distance": 400, "size": 40, "duration": 2, "opacity": 8, "speed": 3 },
                    "repulse": { "distance": 200, "duration": 0.4 },
                    "push": { "particles_nb": 4 },
                    "remove": { "particles_nb": 2 }
                }
            },
            "retina_detect": true
        });
    }
});
