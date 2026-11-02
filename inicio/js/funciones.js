
export function paracaidasPersonaje(){
    if(divPersonajes == estado["cayendo"]){
        divPersonajes.innerHTML += `<img src="./img/paracaidas.gif" alt"" class="personaje">`
        estado["cayendo"] = estado["paracaidas"];
    }
}

personajes.addEventListener("click", paracaidasPersonaje);
const empezar = document.querySelector("#iniciar");
const panel = document.querySelector("#panel-inicio");
const divPersonajes = document.querySelector("#personajes");

export function objPersonajes(){
    const posX = Math.floor(Math.random() * 1236)
    const divPersonajes = [
        {id: 0, x: posX, y: 0, velocidad: 0, estado: "cayendo", elemento: "data-id"},
        {id: 1, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 2, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 3, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 4, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 5, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 6, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 7, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 8, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 9, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 10, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 11, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 12, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 13, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 14, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 15, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 16, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 17, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 18, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 19, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 20, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 21, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 22, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 23, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 24, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 25, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 26, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 27, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 28, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 29, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 30, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 31, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 32, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 33, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 34, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 35, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 36, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 37, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 38, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 39, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 40, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 41, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 42, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 43, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 44, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 45, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 46, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 47, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 48, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
        {id: 49, x: posX, y: 0, velocidad: 0, estado: "esperando", elemento: "data-id"},
    ]
}

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
