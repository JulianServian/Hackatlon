// Guardo los elementos que voy a necesitar para manejar la partida y el historial.
const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");
const escenario = document.querySelector("#escenario");
const suelo = document.querySelector("#suelo");
const botonHistorial = document.querySelector("#ver-historial")
const historial = document.querySelector("#historial")
const cerrarHistorial = document.querySelector("#cerrar-historial")

// Defino los valores que uso para crear y mover a los paracaidistas.
const cantidadPersonajes = 50;
const gravedad = 900;
const velocidadConParacaidas = 110;
const altoPersonaje = 80;

// Mantengo aquí el estado de cada personaje y del movimiento de la partida.
let personajesEnJuego = [];
let intervaloCaida = null;
let personajesCompletados = 0;

// Abro y cierro el historial cuando pulso sus botones.
botonHistorial.addEventListener("click", function(){
    historial.classList.add("mostrar")
})

cerrarHistorial.addEventListener("click", function(){
    historial.classList.remove("mostrar");
})

// Creo los personajes y les asigno una posición aleatoria dentro del escenario.
export function objPersonajes(){
    const anchoDisponible = Math.max(0, escenario.clientWidth - 64);
    return Array.from({length: cantidadPersonajes}, (_, id) => ({
        id,
        x: Math.random() * anchoDisponible,
        y: 0,
        velocidad: 0,
        estado: id === 0 ? "cayendo" : "esperando",
        elemento: null
    }));
}

// Inicio una partida nueva y pongo en marcha la actualización de la caída.
export function personajes(){
    // Si ya había una partida en marcha, detengo su intervalo antes de empezar otra.
    if (intervaloCaida !== null) clearInterval(intervaloCaida);
    personajesEnJuego = objPersonajes();
    personajesCompletados = 0;
    pintarPersonajes();

    // Actualizo el movimiento aproximadamente cada 16 milisegundos.
    intervaloCaida = setInterval(actualizarCaida, 16);
}

// Dibujo cada personaje con la imagen que corresponde a su estado.
function pintarPersonajes(){
    divPersonajes.innerHTML = personajesEnJuego.map(personaje => {
        const imagen = personaje.estado === "paracaidas"
            ? "./img/paracaidas.gif"
            : "./img/cayendo.gif";

        // Mientras espera su turno, dejo al personaje oculto.
        const oculto = personaje.estado === "esperando" ? "hidden" : "";
        return `<img class="personaje" data-id="${personaje.id}" src="${imagen}" alt="" style="left: ${personaje.x}px; top: ${personaje.y}px" ${oculto}>`;
    }).join("");
}

// Actualizo la velocidad y la posición de los personajes que están cayendo.
function actualizarCaida(){
    // Uso el tiempo aproximado entre actualizaciones para calcular el movimiento.
    const delta = 0.016;
    // Calculo dónde empieza el suelo para que los personajes no lo atraviesen.
    const limiteSuelo = escenario.clientHeight - suelo.offsetHeight;

    for (const personaje of personajesEnJuego) {
        // No muevo a quienes ya aterrizaron o todavía están esperando su turno.
        if (personaje.estado === "en-suelo" || personaje.estado === "esperando") continue;

        // Resto la altura del personaje para que aterrice justo sobre el suelo.
        const limiteY = Math.max(0, limiteSuelo - altoPersonaje);
        if (personaje.estado === "cayendo") {
            // Aumento la velocidad de caída usando la gravedad.
            personaje.velocidad += gravedad * delta;
        } else if (personaje.estado === "paracaidas") {
            // Con el paracaídas, limito la velocidad para que caiga más despacio.
            personaje.velocidad = Math.min(
                personaje.velocidad + gravedad * delta,
                velocidadConParacaidas
            );
        }

        // Avanzo al personaje sin dejar que pase del límite de aterrizaje.
        personaje.y = Math.min(limiteY, personaje.y + personaje.velocidad * delta);

        if (personaje.y >= limiteY) {
            // Marco que aterrizó y preparo al siguiente personaje de la fila.
            personaje.estado = "en-suelo";
            personaje.velocidad = 0;
            personajesCompletados++;

            // Hago que empiece a caer el primer personaje que sigue esperando.
            for (const siguiente of personajesEnJuego) {
                if (siguiente.estado === "esperando") {
                    siguiente.estado = "cayendo";
                    break;
                }
            }
        }
    }

    // Vuelvo a dibujar los personajes en sus posiciones actualizadas.
    pintarPersonajes();

    // Cuando todos aterrizan, detengo el intervalo para terminar la caída.
    if (personajesCompletados === personajesEnJuego.length) {
        clearInterval(intervaloCaida);
        intervaloCaida = null;
    }
}

// Empiezo la partida cuando pulso el botón de inicio.
export function botonEmpezar(){
    empezar.addEventListener("click", function(){
        panel.classList.remove("mostrar")
        panel.classList.add("oculto")
        personajes();
    })
}

// Abro el paracaídas del personaje que pulso si todavía está cayendo.
export function paracaidasPersonaje(evento){
    // Leo el identificador de la imagen pulsada y busco su personaje.
    const id = Number(evento.target.dataset.id);
    const personaje = personajesEnJuego.find(item => item.id === id);
    if (!personaje || personaje.estado !== "cayendo") return;

    // Cambio su estado y reduzco la velocidad antes de volver a dibujarlo.
    personaje.estado = "paracaidas";
    personaje.velocidad = Math.min(personaje.velocidad, velocidadConParacaidas);
    pintarPersonajes();
}

// Escucho los clics sobre la zona donde aparecen los personajes.
divPersonajes.addEventListener("click", paracaidasPersonaje);

// Dejo preparado el botón para que el jugador pueda iniciar la partida.
botonEmpezar();
