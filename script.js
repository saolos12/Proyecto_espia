// --- FUNCIÓN PARA EL RELOJ EN VIVO (Igual que antes) ---
function actualizarFechaHora() {
    const ahora = new Date();
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const opcionesHora = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
    const elemento = document.getElementById('fecha-hora-vivo');
    if (elemento) {
        elemento.innerHTML = `${fecha} | ${hora}`;
    }
}
// ---------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    
    // --- Iniciar el reloj (Igual que antes) ---
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);
    // -----------------------------------------------------------

    const boton = document.getElementById("btn-ubicacion"); 
    const resultadoDiv = document.getElementById("resultado");
    const widget = document.getElementById("widget-local"); 

    boton.addEventListener("click", function() {
        if (navigator.geolocation) {
            resultadoDiv.innerHTML = "Solicitando permiso...";
            
            // !! LÍNEA MODIFICADA !!
            // Le decimos que se rinda después de 5 segundos (5000 ms)
            navigator.geolocation.getCurrentPosition(
                mostrarPosicion, 
                mostrarError,
                { timeout: 5000 } // <-- ESTA ES LA OPCIÓN AÑADIDA
            );

        } else {
            resultadoDiv.innerHTML = "Tu navegador no soporta geolocalización.";
        }
    });

    // Si ACEPTA y SÍ ENCUENTRA la ubicación a tiempo
    function mostrarPosicion(posicion) {
        widget.classList.add("unlocked");
        resultadoDiv.innerHTML = ""; 
    }

    // Si RECHAZA o si TARDA MÁS DE 5 SEGUNDOS
    function mostrarError(error) {
        let mensaje;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                mensaje = "Permiso denegado.";
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = "La información de ubicación no está disponible.";
                break;
            case error.TIMEOUT:
                // Este es el error que te saldrá si tarda más de 5 seg
                mensaje = "Se agotó el tiempo de espera. Intenta de nuevo."; 
                break;
            default:
                mensaje = "Ocurrió un error desconocido.";
                break;
        }
        resultadoDiv.innerHTML = `Error: ${mensaje}`;
    }
});
