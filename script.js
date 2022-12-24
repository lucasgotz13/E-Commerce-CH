
const interruptorModoOscuro = document.querySelector(".interruptor");
const interruptorSvg = document.querySelector(".svg-interruptor");
const carritoDeComprasSvg = document.querySelector(".shopping-cart-svg");

// funcionalidad modo oscuro

if (localStorage.getItem("darkmode") === "true") {
    document.body.classList.add("darkmode");
    interruptorSvg.src = "assets/sun-svgrepo-com.svg";
    carritoDeComprasSvg.src = "assets/shopping-svgrepo-com-darkmode.svg";
}

interruptorModoOscuro.addEventListener("click", () => {
    if (localStorage.getItem("darkmode") === "false" || localStorage.getItem("darkmode") === null) {
        localStorage.setItem("darkmode", true);
    } else {
        localStorage.setItem("darkmode", false);
    }

    document.body.classList.toggle("darkmode");

    if (document.body.classList.contains("darkmode")) {
        interruptorSvg.src = "assets/sun-svgrepo-com.svg";
        carritoDeComprasSvg.src = "assets/shopping-svgrepo-com-darkmode.svg";
    } else {
        interruptorSvg.src = "assets/moon-svgrepo-com.svg";
        carritoDeComprasSvg.src = "assets/shopping-svgrepo-com.svg";
    }
});

const swiper = new Swiper('.swiper', {
    loop: true,

    pagination: {
        el: '.swiper-pagination'
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }, 
});