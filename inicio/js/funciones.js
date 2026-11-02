const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");

export function personajes(){
    for (let i = 1; i <= 50; i++) {
        divPersonajes.innerHTML += `<img src="./img/cayendo.gif" alt"" class="personaje">` 
    }
}

export function botonEmpezar(){
    empezar.addEventListener("click", function(){
        panel.classList.remove("mostrar")
        panel.classList.add("oculto")
        personajes();
    })
}

botonEmpezar();