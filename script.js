const interruptorModoOscuro = document.querySelector(".interruptor");
const interruptorSvg = document.querySelector(".svg-interruptor");
const carritoDeComprasSvg = document.querySelector(".shopping-cart-svg");
const productosDiv = document.querySelector(".productos");

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

// Carrousel

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

// Renderización de productos

const arrayProductos = JSON.stringify([
    {
        nombre: "Remera Azul Braavosi Good",
        precio: 3200,
        oferta: false,
        imagen: "assets/braavosi.jpg"
    },
    {
        nombre: "Buzo Verde Polo",
        precio: 5429,
        oferta: true,
        imagen: "assets/buzo-polo.jpg" 
    }, 
    {
        nombre: "Pantalon Beige Gabucci Gabardo",
        precio: 8549,
        oferta: false,
        imagen: "assets/gabucci-pantalon.jpg"
    },
    {
        nombre: "Ojota Blanca Fila Drifter Basic",
        precio: 9499,
        oferta: true,
        imagen: "assets/zapatillas-fila.jpg"
    }
])

localStorage.setItem("productos", arrayProductos)


JSON.parse(localStorage.getItem("productos")).forEach(producto => {
    const divCard = document.createElement("div");
    divCard.classList.add("card")

    const imgProducto = document.createElement("img");
    imgProducto.src = producto.imagen
    imgProducto.alt = producto.nombre
    divCard.appendChild(imgProducto)

    const nombreProducto = document.createElement("p");
    nombreProducto.textContent = producto.nombre;
    divCard.appendChild(nombreProducto)

    const precioProducto = document.createElement("p")
    precioProducto.textContent = producto.oferta ? "$" + producto.precio * 0.75 : "$" + producto.precio
    divCard.appendChild(precioProducto)
    
    const añadirCarritoBoton = document.createElement("button")
    añadirCarritoBoton.textContent = "Añadir al carrito"
    añadirCarritoBoton.classList.add("boton-añadir-carrito")
    divCard.appendChild(añadirCarritoBoton)

    productosDiv.appendChild(divCard)
    
})