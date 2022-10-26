// Traigo el carrito de localStorage 
const carrito = JSON.parse(localStorage.getItem("carrito")) || []

const seccionCarrito = document.querySelector("#carrito")

// Renderizo el carrito
function mostrarCarrito() {
    seccionCarrito.innerHTML = ""
    if (carrito.length === 0) {
        seccionCarrito.innerHTML = `
            <div style="text-align: center">
                <p class="text-light">No tienes ningun juego añadido al carrito 😔</p>
                <a class="btn text-light" href="/">Volver al catalogo</a>
            </div>
        `
    } else {
        for (producto of carrito) {
            const { id, nombre, precio, img, cantidad } = producto
            const productoHTML = `
            <div class="producto-carrito">
                <img src="../${img}"></img>
                <h3>${nombre}</h3>
                <p>$${precio}</p>
                <p>Cantidad: ${cantidad}</p>
                <button class="btn btn-success text-light" onclick="añadirAlCarrito(${id})">+</button>
                <button class="btn btn-success text-light" onclick="quitarDelCarrito(${id})">-</button>
            </div>
        `
            seccionCarrito.innerHTML += productoHTML
        }
    }
}

mostrarCarrito()

const seccionResumen = document.querySelector('#resumen')

function mostrarResumen() {
    seccionResumen.innerHTML = ""
    const total = calcularTotal()
    const resumen = `
        <div class="resumen">
            <h3>Resumen</h3>
            <p class="text-light">Total a pagar: $${total}</p>
            <a class="btn btn-success text-light" href="./compra.html">Pasar a finalizar compra</a>
        </div>
    `
    seccionResumen.innerHTML += resumen
}

mostrarResumen()

function añadirAlCarrito(id) {
    const producto = carrito.find(producto => producto.id == id)
    if (producto.cantidad === 1) {
        carrito.splice(carrito.findIndex(producto => producto.id == id), 1)
    } else {
        producto.cantidad++
    }
    mostrarCarrito()
    mostrarResumen()
    guardarCarrito()
}

function quitarDelCarrito(id) {
    const producto = carrito.find(producto => producto.id == id)
    if (producto.cantidad === 1) {
        carrito.splice(carrito.findIndex(producto => producto.id == id), 1)
    } else {
        producto.cantidad--
    }
    mostrarCarrito()
    mostrarResumen()
    guardarCarrito()
}

function calcularTotal() {
    let total = 0
    for (producto of carrito) {
        total += producto.precio * producto.cantidad
    }
    return total
}

// Guardo el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}