"use strict";

const cantidadPersonajes = 50;
const gravedad = 900;
const velocidadConParacaidas = 110;
const altoPersonaje = 80;

const FPS = 60;
const INTERVALO_MS = 2000 / FPS;
const DELTA_SEGUNDOS = 1 / FPS;

let personajesEnJuego = [];
let intervaloId = null;
let personajesCompletados = 0;
let salvados = 0;
let estrellados = 0;

const divPersonajes = document.querySelector("#personajes");
const escenario = document.querySelector("#escenario");
const suelo = document.querySelector("#suelo");

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

function actualizarCaida() {
    if (!escenario || !suelo) return;
    const limiteY = Math.max(0, escenario.clientHeight - suelo.offsetHeight - altoPersonaje);

    for (const personaje of personajesEnJuego) {
        if (personaje.estado === "en-suelo" || personaje.estado === "esperando") continue;

        if (personaje.estado === "cayendo") {
            personaje.velocidad += gravedad * DELTA_SEGUNDOS;
        } else if (personaje.estado === "paracaidas") {
            personaje.velocidad = Math.min(
                personaje.velocidad + gravedad * DELTA_SEGUNDOS,
                velocidadConParacaidas
            );
        }

        personaje.y = Math.min(limiteY, personaje.y + personaje.velocidad * DELTA_SEGUNDOS);

        if (personaje.y >= limiteY) {
            if (personaje.elemento) {
                if (personaje.estado === "paracaidas") {
                    personaje.elemento.src = "./img/salvado.gif";
                    salvados++;
                } else {
                    personaje.elemento.src = "./img/estrellado.gif";
                    estrellados++;
                }
            }
            personaje.estado = "en-suelo";
            personaje.velocidad = 0;
            personajesCompletados++;

            const siguiente = personajesEnJuego.find((p) => p.estado === "esperando");
            if (siguiente) {
                siguiente.estado = "cayendo";
                if (siguiente.elemento) siguiente.elemento.style.display = "block";
            }
        }

        if (personaje.elemento) {
            personaje.elemento.style.top = `${personaje.y}px`;
        }
    }

    if (personajesCompletados >= personajesEnJuego.length) {
        clearInterval(intervaloId);
        intervaloId = null;
    }
}

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

export function personajes() {
    if (intervaloId !== null) clearInterval(intervaloId);

    salvados = 0;
    estrellados = 0;
    personajesCompletados = 0;
    personajesEnJuego = objPersonajes();
    crearElementosDOM();

    intervaloId = setInterval(actualizarCaida, INTERVALO_MS);
}

if (divPersonajes) {
    divPersonajes.addEventListener("click", paracaidasPersonaje);
}