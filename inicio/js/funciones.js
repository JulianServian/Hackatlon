let estadoActual = "cayendo";
let salvados = 0;
let estrellados = 0;

export function paracaidasPersonaje() {
    if (estadoActual === "cayendo") {
        estadoActual = "paracaidas";
        divPersonajes.innerHTML = `<img src="./img/paracaidas.gif" alt="paracaidas" class="personaje">`;
    }
}

divPersonajes.addEventListener("click", paracaidasPersonaje);


function comprobarLlegadaAlSuelo() {
    const posicionPersonaje = divPersonajes.offsetTop;
    const altoEscenario = escenario.offsetHeight;

    if (posicionPersonaje >= altoEscenario) {
        if (estadoActual === "paracaidas") {
            divPersonajes.innerHTML = `<img src="./img/salvado.gif" alt="salvado" class="personaje">`;
            estadoActual = "salvado";
            salvados++;
        } else if (estadoActual === "cayendo") {
            divPersonajes.innerHTML = `<img src="./img/estrellado.gif" alt="estrellado" class="personaje">`;
            estadoActual = "estrellado";
            estrellados++;
        }
    }
}
