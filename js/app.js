// Genero una alerta al entrar en el sitio
Swal.fire({
    title: '¡Bienvenido a Nixo Games!',
    text: 'Debajo se encuentra el catalogo de juegos disponibles'
})


// Llamo a mis productos y sus caracteristicas desde el JSON
async function fetchProductos () {
    const response = await fetch("/json/data.json")
    return await response.json()
}

let cartProductos = []

fetchProductos().then(productos => {
    cartProductos = productos
    mostrarCatalogo()
})

// Genero las cartas para mis productos y sus atributos
const seccionProductos = document.querySelector('#seccion-productos')

function mostrarCatalogo() {
    for (producto of cartProductos) {
        const { id, nombre, precio, desarrollador, etiquetas, img } = producto
        const productoHTML =
        `<div class="card" style="width:18rem;">
        <img src="${img}" class="card-img-top" alt="">
            <div class="card-body">
                <h3 class="card-title">${nombre}</h3>
                <h4 class="card-text desarrollador">Desarrollador: ${desarrollador}</h4>
                <h5 class="card-text precio">Precio: $${precio}</h5>
                <h6 class="card-text etiquetas">${etiquetas}</h6>
                <button class="btn btn-success" onclick="sumarAlCarrito(${id})">Añadir al carrito</button>
            </div>
        </div>`
        
        seccionProductos.innerHTML += productoHTML
    }
}

mostrarCatalogo()

const carrito = JSON.parse(localStorage.getItem("carrito")) || []

function sumarAlCarrito(id) {
    const producto = cartProductos.find(producto => producto.id == id)

    if (carrito.find(producto => producto.id == id)) {
        const producto = carrito.find(producto => producto.id == id)
        producto.cantidad++
    } else {
        carrito.push({
            ...producto,
            cantidad: 1
        })
    }
    guardarCarrito()
}

// Genero una alerta al añadir un producto en el carrito
const boton = document.querySelector('#seccion-productos');

boton.addEventListener("click", () => {

    const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: false,
        didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    Toast.fire({
        icon: 'success',
        title: '¡Añadido al carrito con exito!'
    })
})

// Guardo el carrito en localStorage mediante la generación de un Array
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito))
}