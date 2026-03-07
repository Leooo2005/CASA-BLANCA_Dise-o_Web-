/* =========================================
   MENÚ HAMBURGUESA Y ACORDEÓN MÓVIL
   ========================================= */
const menuToggle = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.enlaces-nav');
const megaDropdowns = document.querySelectorAll('.mega-dropdown');
const directLinks = document.querySelectorAll('.enlaces-nav > a, .mega-columna-enlaces a');

// 1. Abrir/Cerrar panel derecho
menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// 2. Lógica del Acordeón (Empujar hacia abajo en móvil)
megaDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropbtn');
    
    trigger.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
            e.preventDefault();
            
            // Cerrar otros acordeones
            megaDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active-accordion');
                }
            });
            
            dropdown.classList.toggle('active-accordion');
        }
    });
});

// 3. Cerrar el menú completo al elegir un enlace final
directLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            menuToggle.classList.remove('is-active');
            menuLinks.classList.remove('active');
            
            // Cierra todos los acordeones al salir
            megaDropdowns.forEach(dropdown => {
                 dropdown.classList.remove('active-accordion');
            });
        }
    });
});