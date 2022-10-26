// Utilizo una API para configurar las casillas de tarejeta
new Cleave('#tarjeta', {
    creditCard: true,
    onCreditCardTypeChanged: function (type) {
        console.log('Credit card type changed: ', type);
    }
})

new Cleave('#vencimiento', {
    date: true,
    datePattern: ['m', 'y'],
    delimiter: '/'
});

new Cleave('#codigo', {
    numericOnly: true,
    blocks: [3]
});

// Genero una alerta al finalizar la compra del producto
document.querySelector('#confirmar').addEventListener('click', (e) => {
    e.preventDefault()
    Swal.fire({
        title: '¡Listo!',
        text:'¡Muchas gracias por comprar en Nixo Games!',
        icon: 'success',
        footer: 'Sera redireccionado en 5 segundos.',
        allowOutsideClick: false,
        showConfirmButton: false
})
    localStorage.removeItem('carrito')

    setTimeout(() => {
        window.location.href = "/"
    }, 5000)
})