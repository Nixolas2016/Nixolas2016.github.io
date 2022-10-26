// Genero una alerta al enviar un formulario
    document.querySelector('#enviar').addEventListener('click', (e) => {
        e.preventDefault()
        Swal.fire({
            title: '¡Muchas gracias por contactarnos!',
            text: 'Leeremos su solicitud y le responderemos lo antes posible.',
            icon: 'question',
            footer: 'Sera redireccionado en 5 segundos.',
            allowOutsideClick: false,
            showConfirmButton: false
    })
    setTimeout(() => {
        window.location.href = "/"
    }, 5000)
})