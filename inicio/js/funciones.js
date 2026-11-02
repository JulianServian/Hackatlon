// Configuración de físicas y tiempos
const cantidadPersonajes = 50;
const gravedad = 900;
const velocidadConParacaidas = 110;
const altoPersonaje = 80;

const FPS = 60;
const INTERVALO_MS = 1000 / FPS; // Corregido a 1000ms para sincronicidad
const DELTA_SEGUNDOS = 1 / FPS;

// Estado interno del módulo
let personajesEnJuego = [];
let intervaloId = null;
let personajesCompletados = 0;

// Elementos del DOM necesarios para la animación
const divPersonajes = document.querySelector("#personajes");
const escenario = document.querySelector("#escenario");
const suelo = document.querySelector("#suelo");

/**
 * Genera el array inicial con los datos de cada personaje.
 */
export function objPersonajes() {
    const anchoDisponible = Math.max(0, (escenario?.clientWidth || 0) - 64);
    return Array.from({ length: cantidadPersonajes }, (_, id) => ({
        id,
        x: Math.random() * anchoDisponible,
        y: 0,
        velocidad: 0,
        estado: id === 0 ? "cayendo" : "esperando",
        elemento: null
    }));
}

/**
 * Crea las etiquetas <img> en el DOM e inyecta las referencias directas.
 */
function crearElementosDOM() {
    if (!divPersonajes) return;
    divPersonajes.innerHTML = "";
    personajesEnJuego.forEach((personaje) => {
        const img = document.createElement("img");
        img.className = "personaje";
        img.dataset.id = personaje.id;
        img.src = "./img/cayendo.gif";
        img.style.position = "absolute";
        img.style.left = `${personaje.x}px`;
        img.style.top = `${personaje.y}px`;

        if (personaje.estado === "esperando") {
            img.style.display = "none";
        }

        divPersonajes.appendChild(img);
        personaje.elemento = img;
    });
}

/**
 * Bucle principal de físicas y renderizado.
 */
function actualizarCaida() {
    if (!escenario || !suelo) return;
    const limiteSuelo = escenario.clientHeight - suelo.offsetHeight;
    const limiteY = Math.max(0, limiteSuelo - altoPersonaje);

    for (const personaje of personajesEnJuego) {
        if (personaje.estado === "en-suelo" || personaje.estado === "esperando") continue;

        // Físicas según el estado
        if (personaje.estado === "cayendo") {
            personaje.velocidad += gravedad * DELTA_SEGUNDOS;
        } else if (personaje.estado === "paracaidas") {
            personaje.velocidad = Math.min(
                personaje.velocidad + gravedad * DELTA_SEGUNDOS,
                velocidadConParacaidas
            );
        }

        // Nueva posición Y
        personaje.y = Math.min(limiteY, personaje.y + personaje.velocidad * DELTA_SEGUNDOS);

        // Aterrizaje
        if (personaje.y >= limiteY) {
            personaje.estado = "en-suelo";
            personaje.velocidad = 0;
            if (personaje.elemento) personaje.elemento.src = "./img/estrellado.gif";
            personajesCompletados++;

            // Activar el siguiente personaje en cola
            const siguiente = personajesEnJuego.find((p) => p.estado === "esperando");
            if (siguiente) {
                siguiente.estado = "cayendo";
                if (siguiente.elemento) siguiente.elemento.style.display = "block";
            }
        }

        // Actualización directa del DOM
        if (personaje.elemento) {
            personaje.elemento.style.top = `${personaje.y}px`;
        }
    }

    // Detener bucle al terminar todos
    if (personajesCompletados >= personajesEnJuego.length) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}

/**
 * Inicia o reinicia la animación de caída.
 */
export function personajes() {
    if (intervaloId !== null) {
        clearInterval(intervaloId);
        intervaloId = null;
    }

    personajesEnJuego = objPersonajes();
    personajesCompletados = 0;
    crearElementosDOM();

    intervaloId = setInterval(actualizarCaida, INTERVALO_MS);
}

/**
 * Manejador de evento al hacer clic en un personaje cayendo.
 */
export function paracaidasPersonaje(evento) {
    const elemento = evento.target.closest(".personaje");
    if (!elemento) return;

    const id = Number(elemento.dataset.id);
    const personaje = personajesEnJuego.find((item) => item.id === id);

    if (!personaje || personaje.estado !== "cayendo") return;

    personaje.estado = "paracaidas";
    personaje.velocidad = Math.min(personaje.velocidad, velocidadConParacaidas);
    if (personaje.elemento) personaje.elemento.src = "./img/paracaidas.gif";
}