const interruptorModoOscuro = document.querySelector(".interruptor");
const interruptorSvg = document.querySelector(".svg-interruptor");
const carritoDeComprasSvg = document.querySelector(".shopping-cart-svg");
const productosDiv = document.querySelector(".productos");
const main = document.querySelector("main")
const textoProductos = document.querySelector("#nav-productos-texto");

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
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    pagination: {
        el: '.swiper-pagination'
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }, 
});

// renderizacion productos home

getData()
    .then(data => {
        const productos = data.productos
        productos.forEach(producto => {
            if (producto.id < 5) {
                const divCard = document.createElement("div");
                divCard.classList.add("card")
                divCard.setAttribute("data-id", producto.id)

                const imgProducto = document.createElement("img");
                imgProducto.src = producto.imagen
                imgProducto.alt = producto.nombre
                divCard.appendChild(imgProducto)

                const nombreProducto = document.createElement("p");
                nombreProducto.textContent = producto.nombre;
                divCard.appendChild(nombreProducto)

                const precioProducto = document.createElement("p")
                precioProducto.innerHTML = `<p><span style='text-decoration: line-through; color: red'>${producto.oferta ? "$" + producto.precio : ""}</span> $${producto.oferta ? Math.round(producto.precio * 0.75) : producto.precio}</p>`
                divCard.appendChild(precioProducto)
    
                const añadirCarritoBoton = document.createElement("button")
                añadirCarritoBoton.textContent = "Añadir al carrito"
                añadirCarritoBoton.classList.add("boton-añadir-carrito")
                añadirCarritoBoton.addEventListener("click", (e) => añadirAlCarrito(e))
                divCard.appendChild(añadirCarritoBoton)

                productosDiv.appendChild(divCard)
            }           
        })
    })

// página productos

function renderNavProductos(valorCheckbox, valorOrdenSelect) {
    const tituloOfertas = document.createElement("h1")
    tituloOfertas.classList.add("seccion-productos-titulo")
    tituloOfertas.textContent = "25% OFF EN PRODUCTOS DETERMINADOS! APROVECHÁ!"
    main.appendChild(tituloOfertas)

    const navProductos = document.createElement("nav")
    navProductos.classList.add("seccion-filtros-productos")

    const filtroTitulo = document.createElement("h4")
    filtroTitulo.textContent = "Filtrar por:"
    navProductos.appendChild(filtroTitulo)

    const filtrosDiv = document.createElement("div")
    filtrosDiv.classList.add("filtros")
    navProductos.appendChild(filtrosDiv)

    const labelOferta = document.createElement("label")
    labelOferta.textContent = "Ofertas: "
    labelOferta.htmlFor = "oferta"
    filtrosDiv.appendChild(labelOferta)

    const inputOferta = document.createElement("input")
    inputOferta.type = "checkbox"
    inputOferta.id = "oferta"
    inputOferta.checked = valorCheckbox
    inputOferta.addEventListener("change", (e) => checkearValorCheckbox(e))
    filtrosDiv.appendChild(inputOferta)

    const ordenarTitulo = document.createElement("h4")
    ordenarTitulo.textContent = "Ordenar por:"
    navProductos.appendChild(ordenarTitulo)

    const ordenarDiv = document.createElement("div")
    ordenarDiv.classList.add("filtros")

    const selectOrdenar = document.createElement("select")
    selectOrdenar.id = "ordenar"
    selectOrdenar.addEventListener("change", (e) => checkearValorSelect(e))
    ordenarDiv.appendChild(selectOrdenar)

    const optionAZ = document.createElement("option")
    optionAZ.value = "nombre-asc"
    optionAZ.textContent = "A-Z"
    optionAZ.selected = `${valorOrdenSelect == "asc" ? "selected" : ""}`
    selectOrdenar.appendChild(optionAZ)

    const optionZA = document.createElement("option")
    optionZA.value = "nombre-desc"
    optionZA.textContent = "Z-A"
    optionZA.selected = `${valorOrdenSelect == "desc" ? "selected" : ""}` 
    selectOrdenar.appendChild(optionZA)

    const opcionNinguno = document.createElement("option")
    opcionNinguno.value = "nombre-ninguno"
    opcionNinguno.textContent = "Ninguno"
    opcionNinguno.selected = `${valorOrdenSelect == "ninguno" ? "selected" : ""}`
    selectOrdenar.appendChild(opcionNinguno)

    navProductos.appendChild(ordenarDiv)

    main.appendChild(navProductos) 


}

function renderProductosOferta(data) {
    const listaProductos = data.productos
    const listaProductosOferta = listaProductos.filter(producto => producto.oferta == true)
    // console.log(listaProductosOferta)
    
    main.innerHTML = ""
    renderNavProductos(true, "ninguno")
    const productosDiv = document.createElement("div");
    productosDiv.classList.add("seccion-productos__div")

    listaProductosOferta.forEach(producto => {
        const productoDiv = document.createElement("div")
        productoDiv.classList.add("card")

        const nombreProducto = producto.nombre
        const precioProducto = producto.precio
        const imagenProducto = producto.imagen

        const imgProducto = document.createElement("img")
        imgProducto.src = imagenProducto // producto.imagen
        imgProducto.alt = nombreProducto // producto.nombre
        imgProducto.classList.add("seccion-productos__card__img")
        productoDiv.appendChild(imgProducto)

        const nombreProductoP = document.createElement("p")
        nombreProductoP.textContent = nombreProducto // producto.nombre
        nombreProductoP.classList.add("seccion-productos__card__nombre")
        productoDiv.appendChild(nombreProductoP)
        
        const precioProductoP = document.createElement("p")
        precioProductoP.innerHTML = `<p><span style='text-decoration: line-through; color: red'>${producto.oferta ? "$" + precioProducto : ""}</span> $${producto.oferta ? Math.round(precioProducto * 0.75) : precioProducto}</p>` // producto.precio
        precioProductoP.classList.add("seccion-productos__card__precio")
        productoDiv.appendChild(precioProductoP)

        const añadirCarritoBoton = document.createElement("button")
        añadirCarritoBoton.textContent = "Añadir al carrito"
        añadirCarritoBoton.classList.add("boton-añadir-carrito")
        productoDiv.appendChild(añadirCarritoBoton)
        
        productosDiv.appendChild(productoDiv)
    })
    main.appendChild(productosDiv)
}

function renderProductosOrden(data, orden) {
    if (orden == "asc") {
        const arrProductosOrdenado = data.sort((a, b) => {
            return a.nombre === b.nombre ? 0 : a.nombre < b.nombre ? -1 : 1
        })
        main.innerHTML = ""
        renderNavProductos(false, "asc")
        const productosDiv = document.createElement("div");
        productosDiv.classList.add("seccion-productos__div")

        arrProductosOrdenado.forEach(producto => {
            const productoDiv = document.createElement("div")
            productoDiv.classList.add("card")

            const nombreProducto = producto.nombre
            const precioProducto = producto.precio
            const imagenProducto = producto.imagen

            const imgProducto = document.createElement("img")
            imgProducto.src = imagenProducto // producto.imagen
            imgProducto.alt = nombreProducto // producto.nombre
            imgProducto.classList.add("seccion-productos__card__img")
            productoDiv.appendChild(imgProducto)

            const nombreProductoP = document.createElement("p")
            nombreProductoP.textContent = nombreProducto // producto.nombre
            nombreProductoP.classList.add("seccion-productos__card__nombre")
            productoDiv.appendChild(nombreProductoP)
        
            const precioProductoP = document.createElement("p")
            precioProductoP.innerHTML = `<p><span style='text-decoration: line-through; color: red'>${producto.oferta ? "$" + precioProducto : ""}</span> $${producto.oferta ? Math.round(precioProducto * 0.75) : precioProducto}</p>` // producto.precio
            precioProductoP.classList.add("seccion-productos__card__precio")
            productoDiv.appendChild(precioProductoP)

            const añadirCarritoBoton = document.createElement("button")
            añadirCarritoBoton.textContent = "Añadir al carrito"
            añadirCarritoBoton.classList.add("boton-añadir-carrito")
            productoDiv.appendChild(añadirCarritoBoton)
        
            productosDiv.appendChild(productoDiv)
        })
        main.appendChild(productosDiv)
    } else if (orden == "desc") {
        const arrProductosOrdenado = data.sort((a, b) => {
            return a.nombre === b.nombre ? 0 : a.nombre < b.nombre ? 1 : -1
        })
        main.innerHTML = ""
        renderNavProductos(false, "desc")
        const productosDiv = document.createElement("div");
        productosDiv.classList.add("seccion-productos__div")

        arrProductosOrdenado.forEach(producto => {
            const productoDiv = document.createElement("div")
            productoDiv.classList.add("card")

            const nombreProducto = producto.nombre
            const precioProducto = producto.precio
            const imagenProducto = producto.imagen

            const imgProducto = document.createElement("img")
            imgProducto.src = imagenProducto // producto.imagen
            imgProducto.alt = nombreProducto // producto.nombre
            imgProducto.classList.add("seccion-productos__card__img")
            productoDiv.appendChild(imgProducto)

            const nombreProductoP = document.createElement("p")
            nombreProductoP.textContent = nombreProducto // producto.nombre
            nombreProductoP.classList.add("seccion-productos__card__nombre")
            productoDiv.appendChild(nombreProductoP)
        
            const precioProductoP = document.createElement("p")
            precioProductoP.innerHTML = `<p><span style='text-decoration: line-through; color: red'>${producto.oferta ? "$" + precioProducto : ""}</span> $${producto.oferta ? Math.round(precioProducto * 0.75) : precioProducto}</p>` // producto.precio
            precioProductoP.classList.add("seccion-productos__card__precio")
            productoDiv.appendChild(precioProductoP)

            const añadirCarritoBoton = document.createElement("button")
            añadirCarritoBoton.textContent = "Añadir al carrito"
            añadirCarritoBoton.classList.add("boton-añadir-carrito")
            productoDiv.appendChild(añadirCarritoBoton)
        
            productosDiv.appendChild(productoDiv)
        })
        main.appendChild(productosDiv)
    }
}

function checkearValorCheckbox(e) {
    if (e.target.checked) {
        getData()
            .then(data => renderProductosOferta(data))
    } else {
        main.innerHTML = ""
        renderNavProductos(false, "ninguno")
        getData()
            .then(data => renderData(data))
    }
}

function checkearValorSelect(e) {
    if (e.target.value == "nombre-asc") {
        getData()
            .then(data => renderProductosOrden(data.productos, "asc"))
    } else if (e.target.value == "nombre-desc") {
        getData()
            .then(data => renderProductosOrden(data.productos, "desc"))
    } else {
        main.innerHTML = ""
        renderNavProductos(false, "ninguno")
        getData()
            .then(data => renderData(data))
    }
}

textoProductos.addEventListener("click", () => {
    main.innerHTML = ""
    renderNavProductos(false, "ninguno")
    //     main.innerHTML = `
//     <h1 class="seccion-productos-titulo">25% OFF EN PRODUCTOS DETERMINADOS! APROVECHÁ!</h1>
//     <nav class="seccion-filtros-productos">
//         <h4>Filtrar por:</h4>
//         <div class="filtros"> 
//             <label for="oferta">Ofertas: </label>
//             <input type="checkbox" name="oferta" id="oferta">
//         </div>
//         <h4>Ordenar por: </h4>
//         <div class="filtros">
//             <select name="orden" id="orden">
//                 <option value="precio-asc">A-Z</option>
//                 <option value="precio-desc">Z-A</option>
//             </select>
//         </div>
// `;
    getData()
        .then(data => renderData(data))
})



async function getData() {
    const response = await fetch('data.json')
    return response.json()
}

const seccionProductosDiv = document.createElement("div");
seccionProductosDiv.classList.add("seccion-productos__div")

function renderData(data) {
    const productos = data.productos
    const productosDiv = document.createElement("div");
    productosDiv.classList.add("seccion-productos__div")

    productos.forEach(producto => {
        const productoDiv = document.createElement("div")
        productoDiv.classList.add("card")
        // add a data attribute to the div
        productoDiv.setAttribute("data-id", producto.id)

        const nombreProducto = producto.nombre
        const precioProducto = producto.precio
        const imagenProducto = producto.imagen

        const imgProducto = document.createElement("img")
        imgProducto.src = imagenProducto // producto.imagen
        imgProducto.alt = nombreProducto // producto.nombre
        imgProducto.classList.add("seccion-productos__card__img")
        productoDiv.appendChild(imgProducto)

        const nombreProductoP = document.createElement("p")
        nombreProductoP.textContent = nombreProducto // producto.nombre
        nombreProductoP.classList.add("seccion-productos__card__nombre")
        productoDiv.appendChild(nombreProductoP)
        
        const precioProductoP = document.createElement("p")
        precioProductoP.innerHTML = `<p><span style='text-decoration: line-through; color: red'>${producto.oferta ? "$" + precioProducto : ""}</span> $${producto.oferta ? Math.round(precioProducto * 0.75) : precioProducto}</p>` // producto.precio
        precioProductoP.classList.add("seccion-productos__card__precio")
        productoDiv.appendChild(precioProductoP)

        const añadirCarritoBoton = document.createElement("button")
        añadirCarritoBoton.textContent = "Añadir al carrito"
        añadirCarritoBoton.classList.add("boton-añadir-carrito")
        añadirCarritoBoton.addEventListener("click", (e) => añadirAlCarrito(e))
        productoDiv.appendChild(añadirCarritoBoton)
        
        productosDiv.appendChild(productoDiv)
    })
    main.appendChild(productosDiv)
}

// seccion y funcionalidad carrito de compras

let carrito = []

function añadirAlCarrito(e) {

    const productoSeleccionado = e.target.closest(".card")
    console.log(productoSeleccionado.dataset.id)

    if (localStorage.getItem("carrito") == null) {
        getData()
            .then(data => {
                const producto = data.productos.find(producto => producto.id == productoSeleccionado.dataset.id)
                carrito.push(producto)
                console.log(carrito)
            }) 
            .then(() => localStorage.setItem("carrito", JSON.stringify(carrito)))     
    } else {
        carrito = JSON.parse(localStorage.getItem("carrito"))

        getData()
            .then(data => {
                const producto = data.productos.find(producto => producto.id == productoSeleccionado.dataset.id)
                carrito.push(producto)
                console.log(carrito)
            })
            .then(() => localStorage.setItem("carrito", JSON.stringify(carrito)))
    } 
    
    Toastify({

        text: "Producto añadido al carrito",
        duration: 3000,
        close: true,
        style: {
            background: "#0CBF50"
        }

    }).showToast();
}

carritoDeComprasSvg.addEventListener("click", () => {
    main.innerHTML = ""
    
    const divCarrito = document.createElement("div")
    divCarrito.classList.add("carrito-div")
    main.appendChild(divCarrito)

    const tituloCarrito = document.createElement("h1")
    tituloCarrito.textContent = "Tu carrito"
    divCarrito.appendChild(tituloCarrito)
})


