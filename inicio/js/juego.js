"use strict";

import { personajes, paracaidasPersonaje } from "./funciones.js";

// Elementos del DOM
const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");
const botonHistorial = document.querySelector("#ver-historial");
const historial = document.querySelector("#historial");
const cerrarHistorial = document.querySelector("#cerrar-historial");

// Gestores del panel de historial
if (botonHistorial && historial) {
    botonHistorial.addEventListener("click", () => historial.classList.add("mostrar"));
}
if (cerrarHistorial && historial) {
    cerrarHistorial.addEventListener("click", () => historial.classList.remove("mostrar"));
}

// Evento de clic en el contenedor de personajes para activar el paracaídas
if (divPersonajes) {
    divPersonajes.addEventListener("click", paracaidasPersonaje);
}

// Botón de inicio de partida
export function botonEmpezar() {
    if (empezar) {
        empezar.addEventListener("click", function () {
            if (panel) {
                panel.classList.remove("mostrar");
                panel.classList.add("oculto");
            }
            personajes();
        });
    }
}

botonEmpezar();