/* =========================================
   MENÚ HAMBURGUESA Y ACORDEÓN MÓVIL
   ========================================= */
const menuToggle = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.enlaces-nav');
const body = document.body;

// DEFINIMOS LAS VARIABLES QUE FALTABAN
const megaDropdowns = document.querySelectorAll('.mega-dropdown');
const directLinks = document.querySelectorAll('.enlaces-nav > a, .mega-columna-enlaces a');

// 1. Abrir y Cerrar panel derecho
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active');
        menuLinks.classList.toggle('active');
        
        // Bloqueo de scroll para que no "baile" el fondo
        if (menuLinks.classList.contains('active')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });
}

// 2. Lógica del Acordeón (Nuestra Cocina / Bar)
megaDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropbtn');
    
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                
                // Cerrar otros acordeones abiertos
                megaDropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active-accordion');
                    }
                });
                
                dropdown.classList.toggle('active-accordion');
            }
        });
    }
});

// 3. Cerrar el menú al elegir una página
directLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            menuToggle.classList.remove('is-active');
            menuLinks.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});