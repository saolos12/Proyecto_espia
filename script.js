// --- FUNCIÓN PARA EL RELOJ EN VIVO (Igual que antes) ---
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
// ---------------------------------------------


// Esperamos a que todo el contenido de la página esté cargado
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Iniciar el reloj (Igual que antes) ---
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);
    // -----------------------------------------------------------

    // 1. Encontrar los elementos (Igual que antes)
    const boton = document.getElementById("btn-ubicacion"); 
    const resultadoDiv = document.getElementById("resultado");
    const widget = document.getElementById("widget-local"); 

    // 2. Escuchar el clic en el overlay (Igual que antes)
    boton.addEventListener("click", function() {
        
        // 3. Comprobar si soporta Geolocalización (Igual que antes)
        if (navigator.geolocation) {
            
            // Damos retroalimentación de que algo está pasando
            resultadoDiv.innerHTML = "Solicitando permiso...";
            navigator.geolocation.getCurrentPosition(mostrarPosicion, mostrarError);

        } else {
            resultadoDiv.innerHTML = "Tu navegador no soporta geolocalización.";
        }
    });

    // 5. !! FUNCIÓN MODIFICADA !!
    // Esta es la función que se ejecuta si el usuario ACEPTA
    function mostrarPosicion(posicion) {
        
        // En un ataque real, aquí es donde la 'posicion'
        // se enviaría secretamente a un servidor.
        // No le mostramos NADA al usuario.

        // ¡Simplemente "desbloqueamos" el widget para completar el engaño!
        widget.classList.add("unlocked");
        
        // Y limpiamos el texto de "Solicitando permiso..."
        resultadoDiv.innerHTML = ""; 
    }

    // 6. !! FUNCIÓN MODIFICADA !!
    // Esta es la función si el usuario RECHAZA
    function mostrarError(error) {
        let mensaje;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                // Un mensaje más acorde al engaño
                mensaje = "Permiso denegado. No podemos mostrar noticias locales.";
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = "La información de ubicación no está disponible.";
                break;
            case error.TIMEOUT:
                mensaje = "Se agotó el tiempo de espera.";
                break;
            default:
                mensaje = "Ocurrió un error desconocido.";
                break;
        }
        // Mostramos el error
        resultadoDiv.innerHTML = `Error: ${mensaje}`;
    }
});