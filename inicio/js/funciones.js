let estadoActual = "cayendo";
let salvados = 0;
let estrellados = 0;

const estrelladoss = document.querySelector("#estrellados");
const resueltos = document.querySelector("#resueltos")

export function paracaidasPersonaje() {
    if (estadoActual === "cayendo") {
        estadoActual = "paracaidas";
        divPersonajes.innerHTML = `<img src="./img/paracaidas.gif" alt="paracaidas" class="personaje">`;
    }
}

divPersonajes.addEventListener("click", paracaidasPersonaje);
const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");
const botonHistorial = document.querySelector("#ver-historial")
const historial = document.querySelector("#historial")
const cerrarHistorial = document.querySelector("#cerrar-historial")

botonHistorial.addEventListener("click", function(){
    historial.classList.add("mostrar")
})

cerrarHistorial.addEventListener("click", function(){
    historial.classList.remove("mostrar");
})

export function comprobarLlegadaAlSuelo() {
    const posicionPersonaje = divPersonajes.offsetTop;
    const altoEscenario = escenario.offsetHeight;

    if (posicionPersonaje >= altoEscenario) {
        if (estadoActual === "paracaidas") {
            divPersonajes.innerHTML = `<img src="./img/salvado.gif" alt="salvado" class="personaje">`;
            estadoActual = "salvado";
            salvados++;
            resueltos.textContent = salvados;

        } else if (estadoActual === "cayendo") {
            divPersonajes.innerHTML = `<img src="./img/estrellado.gif" alt="estrellado" class="personaje">`;
            estadoActual = "estrellado";
            estrellados++;
            estrelladoss.textContent = estrellados;
        }
    }
}

export function botonEmpezar(){
    empezar.addEventListener("click", function(){
        panel.classList.remove("mostrar")
        panel.classList.add("oculto")
        personajes();
    })
}

const ahora = new Date();
const estrellados = document.querySelector("#estrellados")
const dificultad = document.querySelector("#dificultad").value

export function localPartida(){
    const partida = [
        {nombre: "Ivan", fecha: ahora, puntos: 100, impactos: estrellados, dificultad: dificultad}
    ]
    const textoPartida = JSON.stringify(partida);
    localStorage.getItem("local")
    localStorage.setItem("miPartida", textoPartida)
    const recu = localStorage.getItem("miPartida")
    historial.insertAdjacentHTML("beforeend", recu);
}

localPartida();
botonEmpezar();
