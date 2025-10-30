// --- FUNCIÓN PARA EL RELOJ EN VIVO ---
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


// --- CÓDIGO PRINCIPAL DE LA PÁGINA ---
document.addEventListener("DOMContentLoaded", function() {
    
    // --- Iniciar el reloj ---
    actualizarFechaHora();
    setInterval(actualizarFechaHora, 1000);
    // -----------------------------------------------------------

    // 1. Encontrar los elementos
    const boton = document.getElementById("btn-ubicacion"); // El overlay
    const resultadoDiv = document.getElementById("resultado"); // El div para mensajes
    const widget = document.getElementById("widget-local"); // El widget a desbloquear

    // 2. Escuchar el clic en el overlay
    boton.addEventListener("click", function() {
        
        // 3. Comprobar si el navegador soporta Geolocalización
        if (navigator.geolocation) {
            
            // 4. Mostrar mensaje de carga
            resultadoDiv.innerHTML = "Solicitando permiso...";
            
            // 5. ¡PEDIR EL PERMISO REAL!
            // Esta función llama a 'mostrarPosicion' si tiene éxito
            // o a 'mostrarError' si falla o el usuario lo bloquea.
            navigator.geolocation.getCurrentPosition(
                mostrarPosicion, 
                mostrarError,
                { timeout: 5000 } // Límite de 5 segundos para encontrar la ubicación
            );

        } else {
            // Mensaje si el navegador es muy antiguo
            resultadoDiv.innerHTML = "Tu navegador no soporta geolocalización.";
        }
    });

    // 6. Función que se ejecuta si el usuario ACEPTA
    // y el navegador SÍ ENCUENTRA la ubicación a tiempo
    function mostrarPosicion(posicion) {
        
        // En un ataque real, la 'posicion' se enviaría a un servidor.
        // Nosotros solo desbloqueamos el widget.
        
        widget.classList.add("unlocked");
        
        // Limpiamos el mensaje de "Solicitando..."
        resultadoDiv.innerHTML = ""; 
    }

    // 7. Función que se ejecuta si el usuario RECHAZA
    // o si tarda MÁS DE 5 SEGUNDOS
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
                // Este es el error si tarda más de 5 segundos
                mensaje = "Se agotó el tiempo de espera. Intenta de nuevo.";
                break;
            default:
                mensaje = "Ocurrió un error desconocido.";
                break;
        }
        // Mostramos el error en rojo
        resultadoDiv.innerHTML = `Error: ${mensaje}`;
    }
});
