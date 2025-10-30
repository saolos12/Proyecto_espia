function actualizarFechaHora() {
    const ahora = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    
    const fecha = ahora.toLocaleDateString('es-ES', opcionesFecha);
    const hora = ahora.toLocaleTimeString('es-ES', opcionesHora);
    
    const elemento = document.getElementById('fecha-hora-vivo');
    if (elemento) {
        elemento.innerHTML = `${fecha} | ${hora}`;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);

    const boton = document.getElementById("btn-ubicacion"); 
    const resultadoDiv = document.getElementById("resultado");
    const widget = document.getElementById("widget-local"); 

    boton.addEventListener("click", function() {
        
        if (navigator.geolocation) {
            
            resultadoDiv.innerHTML = "Solicitando permiso...";
            
            navigator.geolocation.getCurrentPosition(
                mostrarPosicion, 
                mostrarError,
                { timeout: 5000 } 
            );

        } else {
            resultadoDiv.innerHTML = "Tu navegador no soporta geolocalización.";
        }
    });

    function mostrarPosicion(posicion) {
        widget.classList.add("unlocked");
        resultadoDiv.innerHTML = ""; 
    }

    function mostrarError(error) {
        let mensaje;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                mensaje = "Permiso denegado. No podemos mostrar noticias locales.";
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = "La información de ubicación no está disponible.";
                break;
            case error.TIMEOUT:
                mensaje = "Se agotó el tiempo de espera. Intenta de nuevo.";
                break;
            default:
                mensaje = "Ocurrió un error desconocido.";
                break;
        }
        resultadoDiv.innerHTML = `Error: ${mensaje}`;
    }
});
