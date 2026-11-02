// Elementos del DOM
const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");
const escenario = document.querySelector("#escenario");
const suelo = document.querySelector("#suelo");
const botonHistorial = document.querySelector("#ver-historial");
const historial = document.querySelector("#historial");
const cerrarHistorial = document.querySelector("#cerrar-historial");

// Configuración de físicas
const cantidadPersonajes = 50;
const gravedad = 900;
const velocidadConParacaidas = 110;
const altoPersonaje = 80;

// Configuración del bucle con Interval
const FPS = 60;
const INTERVALO_MS = 1000 / FPS;
const DELTA_SEGUNDOS = 1 / FPS;

// Estado global
let personajesEnJuego = [];
let intervaloId = null;
let personajesCompletados = 0;

// Gestores del panel de historial
if (botonHistorial && historial) {
    botonHistorial.addEventListener("click", () => historial.classList.add("mostrar"));
}
if (cerrarHistorial && historial) {
    cerrarHistorial.addEventListener("click", () => historial.classList.remove("mostrar"));
}

// 1. Inicializa el array de personajes
export function objPersonajes() {
    const anchoDisponible = Math.max(0, escenario.clientWidth - 64);
    return Array.from({ length: cantidadPersonajes }, (_, id) => ({
        id,
        x: Math.random() * anchoDisponible,
        y: 0,
        velocidad: 0,
        estado: id === 0 ? "cayendo" : "esperando",
        elemento: null
    }));
}

// 2. Crea los elementos HTML una sola vez en el DOM
function crearElementosDOM() {
    divPersonajes.innerHTML = "";
    personajesEnJuego.forEach(personaje => {
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
        personaje.elemento = img; // Guardamos la referencia directa al nodo DOM
    });
}

// 3. Inicia la partida y arranca la animación con setInterval
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

// 4. Bucle principal de actualización
function actualizarCaida() {
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

        // Posición
        personaje.y = Math.min(limiteY, personaje.y + personaje.velocidad * DELTA_SEGUNDOS);

        // Aterrizaje
        if (personaje.y >= limiteY) {
            personaje.estado = "en-suelo";
            personaje.velocidad = 0;
            personajesCompletados++;

            // Mostrar el siguiente personaje en espera
            const siguiente = personajesEnJuego.find(p => p.estado === "esperando");
            if (siguiente) {
                siguiente.estado = "cayendo";
                siguiente.elemento.style.display = "block";
            }
        }

        // Actualización directa de la vista (DOM) sin regenerar el HTML
        personaje.elemento.style.top = `${personaje.y}px`;
    }

    // Detener el intervalo cuando todos hayan completado el recorrido
    if (personajesCompletados >= personajesEnJuego.length) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}

// 5. Escuchador de clics para desplegar el paracaídas
export function paracaidasPersonaje(evento) {
    const id = Number(evento.target.dataset.id);
    const personaje = personajesEnJuego.find(item => item.id === id);

    if (!personaje || personaje.estado !== "cayendo") return;

    personaje.estado = "paracaidas";
    personaje.velocidad = Math.min(personaje.velocidad, velocidadConParacaidas);
    personaje.elemento.src = "./img/paracaidas.gif";
}

divPersonajes.addEventListener("click", paracaidasPersonaje);

// 6. Botón de inicio
export function botonEmpezar() {
    if (empezar) {
        empezar.addEventListener("click", function () {
            panel.classList.remove("mostrar");
            panel.classList.add("oculto");
            personajes();
        });
    }
}

botonEmpezar();