/* =========================================
   1. MENÚ HAMBURGUESA Y ACORDEÓN MÓVIL
   ========================================= */
const menuToggle = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.enlaces-nav');
const body = document.body;

const megaDropdowns = document.querySelectorAll('.mega-dropdown');
const directLinks = document.querySelectorAll('.enlaces-nav > a, .mega-columna-enlaces a');

// Abrir y Cerrar panel derecho (Y hacer la animación de la X)
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('is-active'); // ESTO ACTIVA LA ANIMACIÓN DE LA X
        menuLinks.classList.toggle('active');
        
        if (menuLinks.classList.contains('active')) {
            body.classList.add('no-scroll');
        } else {
            body.classList.remove('no-scroll');
        }
    });
}

// Lógica del Acordeón para los sub-menús en celular
megaDropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('.dropbtn');
    
    if (trigger) {
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                
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

// Cerrar menú al elegir página
directLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
            menuToggle.classList.remove('is-active');
            menuLinks.classList.remove('active');
            body.classList.remove('no-scroll');
        }
    });
});

/* =========================================
   2. BUSCADOR INTELIGENTE: DICCIONARIO MAESTRO (ES/EN)
   ========================================= */
const btnAbrirBuscador = document.getElementById('btn-abrir-buscador');
const btnCerrarBuscador = document.getElementById('btn-cerrar-buscador');
const cajaBuscador = document.getElementById('caja-buscador-dropdown');
const inputBuscador = document.getElementById('input-buscador');
const resultadosBusqueda = document.getElementById('resultados-busqueda');
const btnLangs = document.querySelectorAll('.btn-lang-buscar');
const txtLangSearch = document.getElementById('txt-lang-search');

let idiomaBusqueda = 'es'; // Por defecto en español

// ==========================================
// EL GRAN DICCIONARIO (TODOS LOS PRODUCTOS)
// ==========================================
const productosExactos = [
    // --- PLATOS PRINCIPALES ---
    { idHTML: "plato-tomahawk", nombresES: ["tomahawk", "corte tomahawk", "hacha"], nombresEN: ["tomahawk", "tomahawk steak", "premium tomahawk"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Tomahawk Premium", nombreOficialEN: "Premium Tomahawk" },
    { idHTML: "plato-bife", nombresES: ["bife", "bife de chorizo", "chorizo", "carne"], nombresEN: ["bife", "strip steak", "striploin", "meat"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Bife de Chorizo", nombreOficialEN: "Bife de Chorizo (Striploin)" },
    { idHTML: "plato-picana", nombresES: ["picaña", "picana", "espada"], nombresEN: ["picanha", "sword", "picaña"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Picaña a la Espada", nombreOficialEN: "Sword-Grilled Picanha" },
    { idHTML: "plato-ribeye", nombresES: ["ribeye", "ojo de bife", "añejado"], nombresEN: ["ribeye", "aged ribeye", "rib eye"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Ribeye Añejado", nombreOficialEN: "Aged Ribeye" },
    { idHTML: "plato-tbone", nombresES: ["t-bone", "tbone", "t bone"], nombresEN: ["t-bone", "tbone", "t bone"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "T-Bone Clásico", nombreOficialEN: "Classic T-Bone" },
    { idHTML: "plato-salmon", nombresES: ["salmon", "salmón", "pescado"], nombresEN: ["salmon", "fish", "wild salmon"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Salmón Salvaje", nombreOficialEN: "Wild Salmon" },
    { idHTML: "plato-risotto", nombresES: ["risotto", "trufa", "arroz"], nombresEN: ["risotto", "truffle", "rice"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Risotto de Trufa", nombreOficialEN: "Truffle Risotto" },
    { idHTML: "plato-pollo", nombresES: ["pollo", "pollo a la leña", "citrico"], nombresEN: ["chicken", "wood-fired chicken", "citrus"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Pollo Cítrico a la Leña", nombreOficialEN: "Wood-Fired Citrus Chicken" },
    { idHTML: "plato-pulpo", nombresES: ["pulpo", "tentaculos"], nombresEN: ["octopus", "tentacles"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Pulpo a la Brasa", nombreOficialEN: "Grilled Octopus" },
    { idHTML: "plato-costillas", nombresES: ["costillas", "ribs", "cerdo", "chancho", "bbq"], nombresEN: ["ribs", "pork ribs", "smoked ribs", "bbq"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Costillas Ahumadas", nombreOficialEN: "Smoked Ribs" },

    // --- GUARNICIONES (SIDES) ---
    { idHTML: "plato-pure", nombresES: ["pure", "puré", "papa"], nombresEN: ["puree", "mashed potatoes", "potato"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Puré Rústico Trufado", nombreOficialEN: "Rustic Truffle Mashed Potatoes" },
    { idHTML: "plato-esparragos", nombresES: ["esparragos", "espárragos"], nombresEN: ["asparagus"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Espárragos a la Brasa", nombreOficialEN: "Grilled Asparagus" },
    { idHTML: "plato-mac", nombresES: ["mac and cheese", "mac & cheese", "langosta", "pasta"], nombresEN: ["mac and cheese", "mac & cheese", "lobster", "pasta"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Mac & Cheese de Langosta", nombreOficialEN: "Lobster Mac & Cheese" },
    { idHTML: "plato-champinones", nombresES: ["champiñones", "hongos"], nombresEN: ["mushrooms", "wild mushrooms"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Champiñones Silvestres", nombreOficialEN: "Wild Mushrooms" },
    { idHTML: "plato-papas", nombresES: ["papas fritas", "papas parmesanas"], nombresEN: ["fries", "parmesan fries", "chips"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Papas Fritas Parmesanas", nombreOficialEN: "Parmesan Fries" },
    { idHTML: "plato-ensalada", nombresES: ["ensalada", "verde", "huerto"], nombresEN: ["salad", "garden salad", "greens"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", nombreOficialES: "Ensalada Fresca", nombreOficialEN: "Fresh Garden Salad" },

    // --- BURGERS & GRILL ---
    { idHTML: "plato-burger-casablanca", nombresES: ["hamburguesa casa blanca", "burger", "hamburguesa de la casa", "especial"], nombresEN: ["casa blanca burger", "burger", "house burger"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "La Casa Blanca Burger", nombreOficialEN: "The Casa Blanca Burger" },
    { idHTML: "plato-burger-trufa", nombresES: ["hamburguesa trufa", "hamburguesa hongos"], nombresEN: ["truffle burger", "mushroom burger"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Trufa & Hongos", nombreOficialEN: "Truffle & Mushroom" },
    { idHTML: "plato-burger-blue", nombresES: ["hamburguesa blue cheese", "hamburguesa tocino"], nombresEN: ["blue cheese burger", "bacon burger"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Blue Cheese & Bacon", nombreOficialEN: "Blue Cheese & Bacon Burger" },
    { idHTML: "plato-burger-chicken", nombresES: ["hamburguesa de pollo", "crispy chicken"], nombresEN: ["chicken burger", "crispy chicken"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Crispy Chicken Parm", nombreOficialEN: "Crispy Chicken Parm" },
    { idHTML: "plato-burger-beyond", nombresES: ["hamburguesa vegana", "beyond", "vegetariana"], nombresEN: ["vegan burger", "beyond burger", "vegetarian"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Beyond Burger (Vegana)", nombreOficialEN: "Beyond Burger (Vegan)" },
    { idHTML: "plato-pollo-ahumado", nombresES: ["medio pollo", "pollo ahumado"], nombresEN: ["half chicken", "smoked chicken"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Pollo Ahumado", nombreOficialEN: "Smoked Half Chicken" },
    { idHTML: "plato-matambre", nombresES: ["matambre", "pizza"], nombresEN: ["matambre"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Matambre a la Pizza", nombreOficialEN: "Matambre a la Pizza" },
    { idHTML: "plato-choripan", nombresES: ["choripan", "choripán", "chorizo"], nombresEN: ["choripan", "sausage"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Choripán Gourmet", nombreOficialEN: "Gourmet Choripán" },
    { idHTML: "plato-brochetas", nombresES: ["brochetas", "pinchos", "chuzos"], nombresEN: ["skewers", "kebabs"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Brochetas Mixtas", nombreOficialEN: "Mixed Skewers" },
    { idHTML: "plato-portobello", nombresES: ["portobello", "hongo relleno"], nombresEN: ["portobello", "stuffed mushroom"], urlES: "comidas.html", urlEN: "comidas-en.html", nombreOficialES: "Portobello Grillado", nombreOficialEN: "Grilled Portobello" },

    // --- MENÚ INFANTIL ---
    { idHTML: "plato-mini-burger", nombresES: ["mini burger", "hamburguesa niños", "infantil"], nombresEN: ["mini burger", "kids burger"], urlES: "menu-infantil.html", urlEN: "menu-infantil-en.html", nombreOficialES: "Mini Burger Classic", nombreOficialEN: "Classic Mini Burger" },
    { idHTML: "plato-tenders", nombresES: ["tenders", "deditos", "nuggets", "pollo niños"], nombresEN: ["tenders", "chicken fingers", "nuggets", "kids chicken"], urlES: "menu-infantil.html", urlEN: "menu-infantil-en.html", nombreOficialES: "Crispy Tenders", nombreOficialEN: "Crispy Tenders" },
    { idHTML: "plato-lomito-kids", nombresES: ["lomito", "lomo niños"], nombresEN: ["petite tenderloin", "kids steak"], urlES: "menu-infantil.html", urlEN: "menu-infantil-en.html", nombreOficialES: "Lomito Kids", nombreOficialEN: "Petite Tenderloin" },
    { idHTML: "plato-mac-kids", nombresES: ["mac and cheese niños", "fideos", "coditos"], nombresEN: ["kids mac", "pasta", "macaroni"], urlES: "menu-infantil.html", urlEN: "menu-infantil-en.html", nombreOficialES: "Mac & Cheese", nombreOficialEN: "Mac & Cheese" },

    // --- CÓCTELES ---
    { idHTML: "coctel-patron-ahumado", nombresES: ["patron", "patrón", "ahumado", "mezcal"], nombresEN: ["patron", "smoked patron", "mezcal"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "El Patrón Ahumado", nombreOficialEN: "The Smoked Patrón" },
    { idHTML: "coctel-viuda-negra", nombresES: ["viuda", "negra", "vodka mora"], nombresEN: ["black widow", "widow"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Viuda Negra", nombreOficialEN: "Black Widow" },
    { idHTML: "coctel-spritz", nombresES: ["spritz", "aperol", "prosecco"], nombresEN: ["spritz", "aperol"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Casa Blanca Spritz", nombreOficialEN: "Casa Blanca Spritz" },
    { idHTML: "coctel-pasion-andina", nombresES: ["pasion", "pasión", "andina", "maracuya"], nombresEN: ["passion", "andean passion", "passion fruit"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Pasión Andina", nombreOficialEN: "Andean Passion" },
    { idHTML: "coctel-golden-negroni", nombresES: ["negroni", "golden"], nombresEN: ["negroni", "golden"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Golden Negroni", nombreOficialEN: "Golden Negroni" },
    { idHTML: "coctel-old-fashioned", nombresES: ["old fashioned", "bourbon", "whisky"], nombresEN: ["old fashioned", "bourbon"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Old Fashioned Reserva", nombreOficialEN: "Reserve Old Fashioned" },
    { idHTML: "coctel-margarita", nombresES: ["margarita", "tequila", "cadillac"], nombresEN: ["margarita", "tequila"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Margarita Cadillac", nombreOficialEN: "Cadillac Margarita" },
    { idHTML: "coctel-martini", nombresES: ["martini", "dry martini"], nombresEN: ["martini", "dry martini"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Dry Martini", nombreOficialEN: "Dry Martini" },
    { idHTML: "coctel-moscow-mule", nombresES: ["moscow", "mule", "jengibre"], nombresEN: ["moscow", "mule", "ginger beer"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Moscow Mule Artesanal", nombreOficialEN: "Artisanal Moscow Mule" },
    { idHTML: "coctel-mojito", nombresES: ["mojito", "ron", "menta", "hierbabuena"], nombresEN: ["mojito", "rum", "mint"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", nombreOficialES: "Mojito Royal", nombreOficialEN: "Royal Mojito" },

    // --- CERVEZAS ---
    { idHTML: "bebida-golden-ale", nombresES: ["golden", "ale", "rubia", "cerveza rubia"], nombresEN: ["golden", "ale", "blonde"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Golden Ale Casa Blanca", nombreOficialEN: "Casa Blanca Golden Ale" },
    { idHTML: "bebida-ipa-andina", nombresES: ["ipa", "paramo", "amarga"], nombresEN: ["ipa", "paramo"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "IPA Andina", nombreOficialEN: "Andean IPA" },
    { idHTML: "bebida-stout-cacao", nombresES: ["stout", "negra", "cacao", "cerveza negra"], nombresEN: ["stout", "dark beer", "cacao"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Stout Cacao Fino", nombreOficialEN: "Fine Cacao Stout" },
    { idHTML: "bebida-amber-ale", nombresES: ["amber", "roja", "volcanica"], nombresEN: ["amber", "red ale", "volcanic"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Amber Ale Volcánica", nombreOficialEN: "Volcanic Amber Ale" },
    { idHTML: "bebida-weissbier", nombresES: ["weissbier", "trigo", "blanca"], nombresEN: ["weissbier", "wheat", "white beer"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Weissbier Trigo Místico", nombreOficialEN: "Mystic Wheat Weissbier" },
    { idHTML: "bebida-pilsner", nombresES: ["pilsner", "pilsen", "clara", "biela"], nombresEN: ["pilsner", "pilsen", "clear beer"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Pilsner Ecuatorial", nombreOficialEN: "Equatorial Pilsner" },
    { idHTML: "bebida-saison", nombresES: ["saison", "belga"], nombresEN: ["saison", "belgian"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Saison de los Andes", nombreOficialEN: "Andean Saison" },
    { idHTML: "bebida-porter", nombresES: ["porter", "ahumada"], nombresEN: ["porter", "smoked beer"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Porter Ahumada", nombreOficialEN: "Wood-Smoked Porter" },

    // --- VINOS ---
    { idHTML: "vino-malbec", nombresES: ["malbec", "vino tinto", "argentino"], nombresEN: ["malbec", "red wine"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Malbec Reserva", nombreOficialEN: "Malbec Reserva" },
    { idHTML: "vino-cabernet", nombresES: ["cabernet", "sauvignon"], nombresEN: ["cabernet", "sauvignon"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Cabernet Sauvignon", nombreOficialEN: "Cabernet Sauvignon" },
    { idHTML: "vino-carmenere", nombresES: ["carmenere", "carménère"], nombresEN: ["carmenere", "carménère"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Carménère", nombreOficialEN: "Carménère Gran Reserva" },
    { idHTML: "vino-merlot", nombresES: ["merlot"], nombresEN: ["merlot"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Merlot Clásico", nombreOficialEN: "Classic Merlot" },
    { idHTML: "vino-chardonnay", nombresES: ["chardonnay", "vino blanco"], nombresEN: ["chardonnay", "white wine"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Chardonnay", nombreOficialEN: "Barrel Chardonnay" },
    { idHTML: "vino-sauvignon", nombresES: ["sauvignon blanc", "blanco"], nombresEN: ["sauvignon blanc"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Sauvignon Blanc", nombreOficialEN: "Sauvignon Blanc" },
    { idHTML: "vino-pinot-noir", nombresES: ["pinot", "noir"], nombresEN: ["pinot", "noir"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Pinot Noir", nombreOficialEN: "Pinot Noir Estate" },
    { idHTML: "vino-syrah", nombresES: ["syrah"], nombresEN: ["syrah"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Syrah", nombreOficialEN: "Selection Syrah" },

    // --- LICORES ---
    { idHTML: "licor-miske", nombresES: ["miske", "agave", "tequila ecuatoriano"], nombresEN: ["miske", "agave", "ecuadorian tequila"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Miske Agave", nombreOficialEN: "Miske Andean Agave" },
    { idHTML: "licor-pajaro-azul", nombresES: ["pajaro azul", "pájaro azul", "aguardiente", "guanchaca"], nombresEN: ["pajaro azul", "cane spirit"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Pájaro Azul", nombreOficialEN: "Premium Pájaro Azul" },
    { idHTML: "licor-gin-crespo", nombresES: ["gin crespo", "ginebra"], nombresEN: ["gin crespo", "gin"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Gin Crespo", nombreOficialEN: "Crespo London Dry Gin" },
    { idHTML: "licor-macallan", nombresES: ["macallan", "whisky macallan"], nombresEN: ["macallan", "whiskey", "scotch"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "The Macallan 12", nombreOficialEN: "The Macallan 12 Yrs" },
    { idHTML: "licor-johnnie-blue", nombresES: ["blue label", "johnnie walker", "etiqueta azul"], nombresEN: ["blue label", "johnnie walker"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Johnnie Walker Blue", nombreOficialEN: "Johnnie Walker Blue Label" },
    { idHTML: "licor-glenfiddich", nombresES: ["glenfiddich"], nombresEN: ["glenfiddich"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Glenfiddich 15", nombreOficialEN: "Glenfiddich 15 Yrs" },
    { idHTML: "licor-zacapa", nombresES: ["zacapa", "ron zacapa"], nombresEN: ["zacapa", "rum zacapa"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Ron Zacapa 23", nombreOficialEN: "Ron Zacapa 23" },
    { idHTML: "licor-don-julio", nombresES: ["don julio", "don julio 70", "tequila añejo"], nombresEN: ["don julio", "don julio 70", "tequila"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", nombreOficialES: "Tequila Don Julio 70", nombreOficialEN: "Tequila Don Julio 70" },

    // --- POSTRES ---
    { idHTML: "postre-volcan", nombresES: ["volcan", "volcán", "chocolate", "fondant"], nombresEN: ["lava cake", "chocolate cake", "volcano"], urlES: "postres.html", urlEN: "postres-en.html", nombreOficialES: "Volcán de Chocolate", nombreOficialEN: "Chocolate Lava Cake" },
    { idHTML: "postre-cheesecake", nombresES: ["cheesecake", "queso", "frutos rojos"], nombresEN: ["cheesecake", "cheese cake", "berries"], urlES: "postres.html", urlEN: "postres-en.html", nombreOficialES: "New York Cheesecake", nombreOficialEN: "New York Cheesecake" },
    { idHTML: "postre-tiramisu", nombresES: ["tiramisu", "tiramisú", "cafe"], nombresEN: ["tiramisu", "coffee dessert"], urlES: "postres.html", urlEN: "postres-en.html", nombreOficialES: "Tiramisú de la Casa", nombreOficialEN: "House Tiramisu" },
    { idHTML: "postre-creme-brulee", nombresES: ["creme brulee", "crema", "quemada"], nombresEN: ["creme brulee", "custard"], urlES: "postres.html", urlEN: "postres-en.html", nombreOficialES: "Crème Brûlée", nombreOficialEN: "Crème Brûlée" },
    { idHTML: "postre-panna-cotta", nombresES: ["panna cotta", "panacota", "maracuya"], nombresEN: ["panna cotta", "passion fruit dessert"], urlES: "postres.html", urlEN: "postres-en.html", nombreOficialES: "Panna Cotta", nombreOficialEN: "Passion Fruit Panna Cotta" },
    { idHTML: "postre-tarta-manzana", nombresES: ["tarta", "manzana", "pie"], nombresEN: ["apple tart", "apple pie", "tart"], urlES: "postres.html", urlEN: "postres-en.html", nombreOficialES: "Tarta de Manzana", nombreOficialEN: "Thin Apple Tart" }
];

// ==========================================
// 2. CATEGORÍAS GENERALES (Si buscan algo ambiguo)
// ==========================================
const categoriasGenerales = [
    { nombresES: ["postre", "dulce", "helado"], nombresEN: ["dessert", "sweet", "ice cream"], urlES: "postres.html", urlEN: "postres-en.html", categoriaES: "Postres", categoriaEN: "Desserts" },
    { nombresES: ["carne", "corte", "parrilla", "asado"], nombresEN: ["meat", "steak", "grill", "cut"], urlES: "platos-principales.html", urlEN: "platos-principales-en.html", categoriaES: "Cortes Premium", categoriaEN: "Premium Cuts" },
    { nombresES: ["vino", "tinto", "blanco", "copa", "botella"], nombresEN: ["wine", "red wine", "white wine", "glass", "bottle"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", categoriaES: "Vinos", categoriaEN: "Wines" },
    { nombresES: ["biela", "cerveza", "artesanal", "draft"], nombresEN: ["beer", "craft beer", "draft"], urlES: "cervezas-vinos.html", urlEN: "cervezas-vinos-en.html", categoriaES: "Cervezas", categoriaEN: "Beers" },
    { nombresES: ["trago", "licor", "coctel", "bebida"], nombresEN: ["drink", "cocktail", "liquor", "booze"], urlES: "cocteles-especiales.html", urlEN: "cocteles-especiales-en.html", categoriaES: "Bar & Cocteles", categoriaEN: "Bar & Cocktails" },
    { nombresES: ["hamburguesa", "burger", "fast food"], nombresEN: ["burger", "hamburger", "fast food"], urlES: "comidas.html", urlEN: "comidas-en.html", categoriaES: "Hamburguesas", categoriaEN: "Burgers" },
    { nombresES: ["niño", "niños", "infantil", "kids", "pequeño"], nombresEN: ["kids", "child", "children"], urlES: "menu-infantil.html", urlEN: "menu-infantil-en.html", categoriaES: "Menú Infantil", categoriaEN: "Kids Menu" }
];

// ==========================================
// 3. LÓGICA DE INTERFAZ Y BÚSQUEDA
// ==========================================

// Cambiar Idioma en el Buscador
if (btnLangs) {
    btnLangs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            btnLangs.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            idiomaBusqueda = e.target.getAttribute('data-lang');
            
            if(idiomaBusqueda === 'en') {
                inputBuscador.placeholder = "Type your craving & press Enter...";
                txtLangSearch.innerText = "Search in:";
            } else {
                inputBuscador.placeholder = "Escribe tu antojo y presiona Enter...";
                txtLangSearch.innerText = "Buscar en:";
            }
            resultadosBusqueda.innerHTML = ''; 
        });
    });
}

// Abrir/Cerrar
if (btnAbrirBuscador) {
    btnAbrirBuscador.addEventListener('click', () => {
        cajaBuscador.classList.toggle('activo');
        if(cajaBuscador.classList.contains('activo')) setTimeout(() => inputBuscador.focus(), 100);
    });
}
if (btnCerrarBuscador) {
    btnCerrarBuscador.addEventListener('click', () => {
        cajaBuscador.classList.remove('activo');
        inputBuscador.value = '';
        resultadosBusqueda.innerHTML = '';
    });
}

// BUSCAR AL DAR ENTER
if (inputBuscador) {
    inputBuscador.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const busqueda = inputBuscador.value.toLowerCase().trim();
            if (busqueda === '') return;

            let productoEncontrado = null;
            let categoriaEncontrada = null;

            // Buscar en Platos Exactos
            for (let prod of productosExactos) {
                let listaNombres = idiomaBusqueda === 'es' ? prod.nombresES : prod.nombresEN;
                if (listaNombres.some(nombre => busqueda.includes(nombre) || nombre.includes(busqueda))) {
                    productoEncontrado = prod;
                    break;
                }
            }

            // Buscar en Categorías Generales
            if (!productoEncontrado) {
                for (let cat of categoriasGenerales) {
                    let listaCat = idiomaBusqueda === 'es' ? cat.nombresES : cat.nombresEN;
                    if (listaCat.some(palabra => busqueda.includes(palabra) || palabra.includes(busqueda))) {
                        categoriaEncontrada = cat;
                        break;
                    }
                }
            }

            // Mostrar Resultados
            if (productoEncontrado) {
                let urlDestino = idiomaBusqueda === 'es' ? productoEncontrado.urlES : productoEncontrado.urlEN;
                let nombreOficial = idiomaBusqueda === 'es' ? productoEncontrado.nombreOficialES : productoEncontrado.nombreOficialEN;
                let mensaje = idiomaBusqueda === 'es' ? "¡Encontramos lo que buscas!" : "We found your craving!";
                let txtBoton = idiomaBusqueda === 'es' ? "Ir a " : "Go to ";

                resultadosBusqueda.innerHTML = `
                    <p style="color: #bdde02; font-weight: bold; margin-bottom: 5px;">${mensaje}</p>
                    <a href="${urlDestino}#${productoEncontrado.idHTML}" class="sugerencia-link">${txtBoton} ${nombreOficial} →</a>
                `;
            } 
            else if (categoriaEncontrada) {
                let urlCat = idiomaBusqueda === 'es' ? categoriaEncontrada.urlES : categoriaEncontrada.urlEN;
                let nombreCat = idiomaBusqueda === 'es' ? categoriaEncontrada.categoriaES : categoriaEncontrada.categoriaEN;
                let txtSugerencia = idiomaBusqueda === 'es' ? "No lo tenemos exacto, pero explora aquí:" : "We don't have that exactly, but explore here:";
                let txtBoton = idiomaBusqueda === 'es' ? "Ver menú de " : "View ";

                resultadosBusqueda.innerHTML = `
                    <p>${txtSugerencia}</p>
                    <a href="${urlCat}" class="sugerencia-link">${txtBoton} ${nombreCat} →</a>
                `;
            } 
            else {
                let txtNoFound = idiomaBusqueda === 'es' ? `Lo sentimos, no hay resultados para "${busqueda}".` : `Sorry, no results for "${busqueda}".`;
                resultadosBusqueda.innerHTML = `<p>${txtNoFound}</p>`;
            }
        }
    });
}

// =========================================
// 4. EFECTO RESALTADO AL CARGAR PÁGINA (Paso 4)
// =========================================
window.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const idPlato = window.location.hash.substring(1); 
        const elementoPlato = document.getElementById(idPlato);

        if (elementoPlato) {
            setTimeout(() => {
                elementoPlato.scrollIntoView({ behavior: 'smooth', block: 'center' });
                elementoPlato.classList.add('plato-encontrado');
                
                setTimeout(() => {
                    elementoPlato.classList.remove('plato-encontrado');
                }, 4000);
            }, 500);
        }
    }
});

// ========================
// LÓGICA DE COOKIES PRO
// ========================
document.addEventListener("DOMContentLoaded", () => {
    const avisoCookies = document.getElementById("aviso-cookies");
    const btnAceptar = document.getElementById("btn-aceptar-cookies");
    const btnRechazar = document.getElementById("btn-rechazar-cookies");
    const btnConfigurar = document.getElementById("btn-configurar-cookies");

    if (avisoCookies) {
        // 1. Revisar si ya tomó una decisión antes
        if (!localStorage.getItem("cookiesAceptadas") && !localStorage.getItem("cookiesRechazadas")) {
            // Mostrar el aviso después de 1 segundo
            setTimeout(() => {
                avisoCookies.classList.remove("oculto");
            }, 1000);
        }

        // 2. Acción: ACEPTAR TODAS
        if (btnAceptar) {
            btnAceptar.addEventListener("click", () => {
                localStorage.setItem("cookiesAceptadas", "true");
                avisoCookies.classList.add("oculto");
            });
        }

        // 3. Acción: RECHAZAR
        if (btnRechazar) {
            btnRechazar.addEventListener("click", () => {
                localStorage.setItem("cookiesRechazadas", "true");
                avisoCookies.classList.add("oculto");
            });
        }

        // 4. Acción: CONFIGURAR (Simulación para el Demo con detección de idioma)
        if (btnConfigurar) {
            btnConfigurar.addEventListener("click", () => {
                // Verificamos si el HTML actual tiene el atributo lang="en"
                const esIngles = document.documentElement.lang === "en";
                
                if(esIngles) {
                    alert("Preferences Module: In the production version, a panel will open here to enable or disable analytical and marketing cookies.");
                } else {
                    alert("Módulo de Preferencias: En la versión en producción, aquí se abrirá un panel para activar o desactivar cookies analíticas y de marketing.");
                }
            });
        }
    }
});